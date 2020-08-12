exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
    const noPerm = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.noPerm)
    return message.channel.send(noPerm);
  }
  let fromMem = message.mentions.members.first();
  const characterName = args[1];
  fromMem.setNickname(characterName).catch(client.log.error)
  const embed = new client.Discord.MessageEmbed()
    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
    .setTitle("*Snap*")
    .setColor(client.config.colour)
    .setTimestamp()
    //.addField("API Latency", `${Math.round(message.client.ws.ping)}ms`, true)
    //.setImage(client.starray.oImg)
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
  message.channel.send({
    embed
  })
  // command ends here
}