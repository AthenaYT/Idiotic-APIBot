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

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (message.mentions.members.size === 0) return message.reply("You must mention someone to generate an API key.");
    args.shift();
    const text = args.join(" ");
    const note = text.length ? text : "No note provided.";
    try {
      await this.client.generate(message.mentions.members.first(), note);
      await message.channel.send(`Please check your DM's for the API key ${message.mentions.members.first()}.`);
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
