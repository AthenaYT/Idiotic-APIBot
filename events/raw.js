const messageReactionAdd = require("../eventsRaw/messageReactionAdd.js");
module.exports = class {

  constructor(client) {
    this.client = client;
    this.messageReactionAdd = new messageReactionAdd(this.client);
  }
  async run(data) {
    switch (data.t) {
      case "MESSAGE_REACTION_ADD": return this.messageReactionAdd.run(data);
      default: return; 
    }
  }

};
