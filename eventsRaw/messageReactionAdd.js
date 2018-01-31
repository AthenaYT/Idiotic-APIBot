module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(data) {
    const reaction = data.d;
    const user = await this.client.fetchUser(reaction.user_id).catch(() => null);
    if (user.id === this.client.user.id) return;
    if (user === null) return false;
    const channel = this.client.channels.get(reaction.channel_id);
    if (!channel || channel.type !== "text" || channel.permissionsFor(this.client.user).has("VIEW_CHANNEL") === false) return false;
    const message = await channel.fetchMessage(reaction.message_id);
    const userChannel = await this.client.users.fetchUser(message.embeds[0].fields[0].embed.footer.text);
    switch (reaction.emoji.name) {

      case "approved":
        console.log("approved");
        await message.clearReactions();
        
        break;
      case "declined":
        // message.clearReactions();
        console.log("declined");
        break;
    
      default:
        break;
    }
  }
};