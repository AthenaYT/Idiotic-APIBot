const ApiClient = require("./structures/ApiClient");
const client = new ApiClient();

client.login(client.token);

client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
  .on("reconnect", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info));

process.on("unhandledRejection", error => console.log(`unhandledRejection:\n${error.stack}`))
  .on("error", error => console.log(`Error:\n${error.stack}`))
  .on("warn", error => console.log(`Warning:\n${error.stack}`));