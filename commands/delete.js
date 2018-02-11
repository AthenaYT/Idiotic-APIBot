const Command = require("../base/Command.js");

class Delete extends Command {

  constructor(client) {
    super(client, {
      name: "delete",
      description: "Deletes an API key from the Idiotic-API.",
      category: "API",
      usage: "delete <key>",
      aliases: ["del"],
      permLevel: "Bot Support"
    });
  }

  async run(message, [key]) {
    if (!key || !key.length) return message.reply("You must supply a key to delete it.");
    try {
      const del = await this.client.keys.destroy({ where: { key } });
      if (!del) return message.reply(`No such key\`${key}\``);
      return message.channel.send(`Successfully deleted \`${key}\``);
    } catch (e) {
      console.log(e);
      return message.reply("Something went wrong with key deletion.");
    }
  }

}

module.exports = Delete;
