exports.run = (client, message, args) => {
    // command starts here
    message.delete();  
    if (!message.member.roles.cache.find(r => r.id=== client.config.memberRole)) {
      const noPerm = new client.Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(client.starray.noPerm)
      return message.channel.send(noPerm);
    }

    const embed = new client.Discord.MessageEmbed()
      .setTitle(client.starray.ping)
      .setColor(client.config.colour)
      .setTimestamp()
      .addField("API Latency", `${Math.round(message.client.ws.ping)}ms`, true)
      .setImage(client.starray.oImg)
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    message.channel.send({ embed })
    // command ends here
}
