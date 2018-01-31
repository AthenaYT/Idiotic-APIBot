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
    const key = require("crypto").randomBytes(15).toString("base64");
    const note = text.length ? text : "";
    try {
      await message.mentions.members.first().send(`Here's the api key \`${key}\`\n\nYou can read the docs at: http://api.anidiots.guide/\n\nInstall the Idiotic-API package \`npm i idiotic-api\` and follow the examples on the API Development Guild <https://discord.gg/PgCR8Rg>\n\nThere is a known issue with the testing on the docs page, that is due to how we're serving the returned image (buffer) for some reason apidocs doesn't seem to know how to handle it correctly.`);
      await this.client.keys.create({ key, note }); // eslint-disable-line no-unused-vars
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
