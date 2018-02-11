const Command = require("../base/Command.js");
const { RichEmbed } = require("discord.js");
const regex = /(https:|http:)\/\/discordapp\.com|authorize|client_id=\d{17,20}|scope=bot/;

class Apply extends Command {

  constructor(client) {
    super(client, {
      name: "apply",
      description: "Submit an application for the API.",
      usage: "apply <bot invite link> <current server count> <reason>"
    });
  }

  async run(message, [invite, count, ...reason]) {
    try {
      reason = reason.join(" ");
      if (message.channel.type !== "dm") return message.reply("Please execute this command in a **Direct Message** for confidentiality.");
      if (!invite || !invite.length) return message.reply("Please provide a invite to your bot.");
      if (!count || !count.length) return message.reply("Please provide your bot's current guild count.");
      if (!reason || !reason.length) return message.reply("You must supply a reason as to why you would like an API key.");

      if (!regex.test(invite)) return message.reply("That is not a valid bot invite URL.");
      if (isNaN(count)) return message.reply("That is not a valid server count.");
      if (Number(count) < 50) return message.reply("You do not meet the minimum requirements for the API `Not enough Guilds`.");
      if (reason.length <= 10) return message.reply("You must supply a reason as to why you would like an API key.");

      const embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField("Invite Link.", `[**Bot Invite Link**](${invite})`, true)
        .addField("Guild Count.", `${count} Guilds`, true)
        .addField("Reason.", reason)
        .setTimestamp()
        .setFooter(message.author.id);

      const msg = await this.client.guilds.get("405783659388469248").channels.get("408235827781697537").send({ embed });
      await msg.react(this.client.emojis.get("408238622597316608"));
      await msg.react(this.client.emojis.get("408238620642639882"));
      return message.reply("Thank you for your application, a member of staff will review it as soon as possible.");
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = Apply;
