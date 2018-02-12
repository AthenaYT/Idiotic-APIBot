module.exports = class {

  constructor(client) {
    this.client = client;
  }

  async run(data) {
    const reaction = data.d;
    const user = await this.client.fetchUser(reaction.user_id).catch(() => null);
    if (!user) return;
    if (user.id === this.client.user.id) return;
    const channel = this.client.channels.get(reaction.channel_id);
    if (!channel || channel.type !== "text" || channel.permissionsFor(this.client.user).has("VIEW_CHANNEL") === false) return false;
    const message = await channel.fetchMessage(reaction.message_id);
    let userChannel;
    switch (reaction.emoji.name) {
      case "approved":
        console.log("approved");
        userChannel = await this.client.users.get(message.embeds[0].fields[0].embed.footer.text);
        await message.clearReactions();
        await this.client.generate(userChannel, `Approved by ${user.tag}`);
        break;
      case "declined":
        console.log("declined");
        userChannel = await this.client.users.get(message.embeds[0].fields[0].embed.footer.text);
        await message.clearReactions();
        await this.client.awaitReply(userChannel, "Why have you declined this key?");

        break;

      default:
        break;
    }
  }

};
