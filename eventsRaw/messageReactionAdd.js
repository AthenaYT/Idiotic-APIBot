module.exports = class {

  constructor(client) {
    this.client = client;
  }

  async run(data) {
    const reaction = data.d;
    const supportGuild = this.client.guilds.get("405783659388469248");
    const officeChannel = supportGuild.channels.get("406609139184304139");
    const user = this.client.users.get(reaction.user_id) || await this.client.fetchUser(reaction.user_id).catch(() => null);
    if (!user) return;
    if (user.id === this.client.user.id) return;
    const channel = this.client.channels.get(reaction.channel_id);
    if (!channel || channel.type !== "text" || channel.permissionsFor(this.client.user).has("VIEW_CHANNEL") === false) return false;
    const message = await channel.fetchMessage(reaction.message_id);
    const applicationUser = this.client.users.get(message.embeds[0].fields[0].embed.footer.text);
    switch (reaction.emoji.name) {
      case "approved": {
        console.log("approved");
        await message.clearReactions();
        await this.client.generate(applicationUser, user.tag, "No note provided.");
        await message.guild.members.get(applicationUser).addRole("417667939039313921");
        break;
      }
      case "declined": {
        console.log("declined");
        await message.clearReactions();
        const declinedMsg = await this.client.awaitDmReply(user, "Why have you declined this key?");
        if (!declinedMsg) return; // TODO: handle this somehow better?
        officeChannel.send(`${user} declined ${applicationUser.tag} with reason: ${declinedMsg}`);
        break;
      }
      default: return;
    }
  }

};
