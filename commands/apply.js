const Command = require("../base/Command.js");
const { RichEmbed } = require("discord.js");

class Apply extends Command {
  constructor(client) {
    super(client, {
      name: "apply",
      description: "Submit an application for the API.",
      usage: "apply <bot invite link> <current server count> <...reason>",
      aliases: []
    });
  }

  async run(message, [invite, count, ...reason], level) { // eslint-disable-line no-unused-vars
    reason = reason.join(" ");
    if (message.channel.type !== "dm") return message.reply("Please execute this command in a **Direct Message** for confidentiality.");
    try {
      const regex = /(https:|http:)\/\/discordapp\.com|authorize|client_id=\d{17,20}|scope=bot/;
      
      if (!regex.exec(invite)) return message.reply("That is not a valid bot invite URL.");
      if (isNaN(count)) return message.reply("That is not a valid server count.");
      if (count < 50) return message.reply("You do not meet the minimum requirements for the API `Not enough Guilds`.");
      if (reason.length < 5) return message.reply("You must supply a reason as to why you would like an API key.");

      const embed = new RichEmbed();
      embed.setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField("Invite Link.", `[Bot Invite Link](${invite})`, true)
        .addField("Guild Count.", `${count} Guilds`, true)
        .addField("Reason.", reason, false)
        .setFooter(message.author.id);

      const msg = await this.client.guilds.get("405783659388469248").channels.get("408235827781697537").send({embed});
      await msg.react(await this.client.emojis.get("408238622597316608"));
      await msg.react(await this.client.emojis.get("408238620642639882"));
      await message.reply("Thank you for your application, a member of staff will review it as soon as possible.");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Apply;
