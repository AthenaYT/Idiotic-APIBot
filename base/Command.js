const { GuildMember, User } = require("discord.js");
const UserRegexp = new RegExp("^(?:<@!?)?(\\d{17,21})>?$");

class Command {

  constructor(client, {
    name = null,
    description = "No description provided.",
    category = "Miscellaneous",
    usage = "No usage provided.",
    enabled = true,
    guildOnly = false,
    aliases = [],
    permLevel = "User"
  }) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel };
    this.help = { name, description, category, usage };
  }

  init() {
    // Here for what so ever reason
  }

  parseUser(query) {
    if (query instanceof GuildMember) return query.user;
    if (query instanceof User) return query;
    if (typeof query === "string") {
      if (UserRegexp.test(query)) return this.client.fetchUser(UserRegexp.exec(query)[1]).catch(() => null);
      if (/\w{1,32}#\d{4}/.test(query)) {
        const res = this.client.users.find(user => user.tag === query);
        return res ? res : null;
      }
    }
    return null;
  }

  parseMember(query, guild) {
    if (!query) return null;
    if (query instanceof GuildMember) return query;
    if (typeof query === "string") {
      if (UserRegexp.test(query)) return guild.fetchMember(UserRegexp.exec(query)[1]).catch(() => null);
      if (/\w{1,32}#\d{4}/.test(query)) return guild.members.find(member => member.user.tag === query) || null;
      const res = guild.members.find(member => member.nickname === query);
      return res ? res : null;
    }
    return null;
  }

}
module.exports = Command;
