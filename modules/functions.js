const keys = require("../models/keys");

module.exports = (client) => {
  client.generate = async (member, note) => {
    const key = require("crypto").randomBytes(15).toString("base64");
    await keys.create({ key, note });
    await member.send(`
Here's the api key \`${key}\`

You can read the docs at: http://api.anidiots.guide/

Install the Idiotic-API package \`npm i idiotic-api\` and follow the examples on the API Development Guild discord.gg/PgCR8Rg

There is a known issue with the testing on the docs page, that is due to how we're serving the returned image (buffer) for some reason apidocs doesn't seem to know how to handle it correctly.`);
  };

  client.awaitReply = async (msg, question, limit = 3000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return null;
    }
  };

  client.clean = async (text) => {
    if (text && (text.constructor.name === "Promise" || text instanceof Promise)) text = await text;
    if (typeof evaled !== "string") text = require("util").inspect(text, { depth: 0 });

    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  String.prototype.toProperCase = function toProperCase() {
    return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  Array.prototype.random = function random() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = ms => new Promise(res => setTimeout(res, ms));
};
