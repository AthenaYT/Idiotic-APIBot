const Command = require("../base/Command.js");

class Delete extends Command {
  constructor(client) {
    super(client, {
      name: "delete",
      description: "Deletes an API key from the Idiotic-API.",
      usage: "delete <key>",
      aliases: ["del"],
      permLevel: "Bot Support"
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (args.length === 0) return message.reply("You must supply a key to delete it.");
    const delKey = args.join(" ");
    try {
      const del = await this.client.keys.destroy({ where: { key: delKey} }); // eslint-disable-line no-unused-vars
      if (!del) return message.reply(`No such key\`${delKey}\``);
      await message.channel.send(`Successfully deleted \`${delKey}\``);
    } catch (e) {
      console.log(e);
      return message.reply("Something went wrong with key deletion.");
    }
  }
}

module.exports = Delete;
