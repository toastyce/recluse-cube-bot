module.exports = (client, member) => {
  const welcomeMessage = new client.Discord.MessageEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setTitle("Welcome!")
    .setColor(client.config.colour)
    .setDescription(client.starray.welcomeMessage.replace("{{user}}", `@${member.id}`))
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    .setTimestamp();

  const embed = new client.Discord.MessageEmbed()
    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
    .setTitle("Departing member")
    .setColor(client.config.colour)
    .setDescription(`<@${member.id}>` + ":\n A user has left the server.")
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    .setTimestamp();

    let id = member.id.toString().substr(0, 4);
  let chan = `sealing-stone-${id}`;

  if (member.guild.channels.cache.find(channel => channel.name === chan)) {
    member.guild.channels.cache.find(channel => channel.name === chan).delete();
    const chDel = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.chDel)
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    return client.channels.cache.get(client.config.logChannel).send(chDel)
  };

  client.log.info(`${member.displayName} has left.`)
};