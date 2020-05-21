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
    .setTitle("New member")
    .setColor(client.config.colour)
    .setDescription(`<@${member.id}>` + ":\n A New user has joined the server.")
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    .setTimestamp();

  member.roles.add(client.config.juniorRole).catch(console.error);
  member.guild.channels.cache.get(client.config.guestChannel).send(`<@${member.id}>`).then(
    member.guild.channels.cache.get(client.config.guestChannel).send(welcomeMessage).catch(client.log.error).then(
      member.guild.channels.cache.get(client.config.logChannel).send(embed).catch(client.log.error)));

  client.log.info(`${member.displayName} has joined.`)
};