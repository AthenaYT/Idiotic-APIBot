if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
const ApiClient = require("./structures/ApiClient");

const client = new ApiClient();

client.login(client.token);

client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
  .on("reconnect", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info));
