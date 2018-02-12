module.exports = class {

  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;

    const { settings } = this.client.config;
    message.settings = settings;
    if (message.content.indexOf(settings.prefix) !== 0) return;
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const level = this.client.permlevel(message);

    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return;

    if (level < this.client.levelCache[cmd.conf.permLevel]) return;

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
    cmd.run(message, args, level);
  }

};
