module.exports = class {

  constructor(client) {
    this.client = client;
  }

  async run(data) {
    const reaction = data.d;
    const user = this.client.users.get(reaction.user_id) || await this.client.users.fetch(reaction.user_id).catch(() => null);
    if (!user) return;
    if (user.id === this.client.user.id) return;
    const channel = this.client.channels.get(reaction.channel_id);
    if (!channel || channel.type !== "text" || channel.permissionsFor(this.client.user).has("VIEW_CHANNEL") === false) return false;
    const message = await channel.fetchMessage(reaction.message_id);
    const applicationUser = this.client.users.get(message.embeds[0].fields[0].embed.footer.text);
    switch (reaction.emoji.name) {
      case "approved": {
        await message.clearReactions();
        await message.edit(`Approved by ${user.tag}`);
        await this.client.generate(applicationUser, user.tag, applicationUser.id);
        await message.guild.member(applicationUser).addRole("407189925247582218");
        break;
      }
      case "declined": {
        await message.clearReactions();
        const declinedMsg = await this.client.awaitDmReply(user, "Why have you declined this key?");
        if (!declinedMsg) return; // TODO: handle this somehow better?
        await message.edit(`Declined by ${user.tag}, reason: **${declinedMsg}**`);
        await applicationUser.send(`You were declined by ${user.tag} with the following reason: **${declinedMsg}**`);
        break;
      }
      default: return;
    }
  }

};
