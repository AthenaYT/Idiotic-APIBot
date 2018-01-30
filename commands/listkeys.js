const Command = require("../base/Command.js");

class List extends Command {
  constructor(client) {
    super(client, {
      name: "list",
      description: "Lists all active API keys.",
      usage: "list",
      aliases: [],
      permLevel: "Bot Support"
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const list = await this.client.keys.findAll({ attributes: ["key"] }); // eslint-disable-line no-unused-vars
      console.log(list);
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        return message.reply("That key already exists.");
      }
      console.log(e);
      return message.reply("Something went wrong with key generation.");
    }
  }
}

module.exports = List;
