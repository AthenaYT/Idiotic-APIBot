const { Client, Collection } = require("discord.js");
const path = require("path");
const readdir = require("util").promisify(require("fs").readdir);
const klaw = require("klaw");
const Database = require("./Database");

class APIBot extends Client {

  constructor(options) {
    super(options);
    require("../modules/functions.js")(this);
    this.config = require("../config.js");
    this.commands = new Collection();
    this.aliases = new Collection();
    this.logger = require("../util/Logger");
    this.database = Database.db;

    this.ready = false;

    this.once("ready", () => this.ready());
  }

  async login(token) {
    await this.init();
    return super.login(token);
  }

  _ready() {
    Database.start();
    this.ready = true;
    this.emit("apiReady");
  }
  
  permlevel(message) {
    let permlvl = 0;
  
    const permOrder = this.client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
  
    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }
  
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(this.client);
      this.client.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
      props.conf.location = commandPath;
      if (props.init) props.init(this.client);
      
      this.client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }
  
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.client.commands.has(commandName)) {
      command = this.client.commands.get(commandName);
    } else if (this.client.aliases.has(commandName)) {
      command = this.client.commands.get(this.client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(this.client);
    }
    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }

  async init() {
    klaw("../commands").on("data", (item) => {
      const cmdFile = path.parse(item.path);
      if (!cmdFile.ext || cmdFile.ext !== ".js") return;
      const response = this.client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
      if (response) this.client.logger.error(response);
    });
    
    const evtFiles = await readdir("../events/");
    this.client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach(file => {
      const eventName = file.split(".")[0];
      const event = new (require(`../events/${file}`))(this.client);
      this.client.on(eventName, (...args) => event.run(...args));
      delete require.cache[require.resolve(`../events/${file}`)];
    });
    
    this.client.levelCache = {};
    for (let i = 0; i < this.client.config.permLevels.length; i++) {
      const thisLevel = this.client.config.permLevels[i];
      this.client.levelCache[thisLevel.name] = thisLevel.level;
    }
  }
  
}

module.exports = APIBot;