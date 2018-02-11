const Command = require("../base/Command.js");

class Ping extends Command {

  constructor(client) {
    super(client, {
      name: "ping",
      description: "Latency and API response times.",
      usage: "ping",
      aliases: ["pong"]
    });
  }

  async run(message) {
    try {
      const msg = await message.channel.send("🏓 Ping!");
      return msg.edit(`🏓 Pong! (Roundtrip took: ${msg.createdTimestamp - message.createdTimestamp}ms. 💙: ${Math.round(this.client.ping)}ms.)`);
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = Ping;
