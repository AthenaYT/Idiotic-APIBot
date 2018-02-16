const Command = require("../base/Command.js");

class Generate extends Command {

  constructor(client) {
    super(client, {
      name: "generate",
      description: "Generates an API key for the Idiotic-API.",
      category: "API",
      usage: "generate <@mention>",
      aliases: ["gen"],
      permLevel: "Bot Support"
    });
  }

  async run(message, [member, ...note]) {
    note = note.join(" ") || "No note provided.";
    member = await this.parseMember(member, message.guild);
    const approvedby = message.author.id;
    if (!member) return message.reply("You must mention someone to generate an API key.");
    try {
      await message.channel.send(`Please check your DM's for the API key ${member}.`);
      await this.client.generate(member, approvedby, note);
    } catch (e) {
      if (e.message === "Cannot send messages to this user") {
        await message.reply("I cannot send you that message, as it appears you have **Direct Messages's** disabled.");
      } else
      if (e.name === "SequelizeUniqueConstraintError") {
        return message.reply("That key already exists.");
      }
      console.log(e);
      return message.reply("Something went wrong with key generation.");
    }
  }

}

module.exports = Generate;
