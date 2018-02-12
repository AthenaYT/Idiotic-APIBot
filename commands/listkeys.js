const Command = require("../base/Command.js");
const keys = require("../models/keys");

class List extends Command {

  constructor(client) {
    super(client, {
      name: "list",
      description: "Lists all active API keys.",
      category: "API",
      usage: "list",
      aliases: [],
      permLevel: "Bot Support"
    });
  }

  async run(message) {
    try {
      const list = await keys.findAll({ attributes: ["key", "note"] });
      await message.author.send(`Here are the current keys in the database:\n${list.map(data => `\`${data.dataValues.key}\`, NOTES: _${data.dataValues.note.length === 0 ? "No note provided" : data.dataValues.note}_`).join("\n")}`);
      if (message.channel.type === "text") await message.channel.send(`Please check your DM's for the API key list ${message.author}.`);
    } catch (e) {
      if (e.message === "Cannot send messages to this user") {
        await message.reply("I cannot send you that message, as it appears you have **Direct Messages's** disabled.");
      } else
      if (e.name === "SequelizeUniqueConstraintError") {
        return message.reply("That key already exists.");
      }
      console.log(e);
      return message.reply("Something went wrong with listing keys.");
    }
  }

}

module.exports = List;
