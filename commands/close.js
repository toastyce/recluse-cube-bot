exports.run = (client, message, args) => {
  // command starts here
  message.delete();

  if (message.channel.name.startsWith('ticket-')) {
    try {
      // TODO: Add member filter to DM logs
      message.channel.delete()

      // log
      const embed = new client.Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setTitle("Ticket Closed")
        .setColor(client.config.colour)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
        .setTimestamp();
      client.channels.cache.get(client.config.logChannel).send({
        embed
      })
      client.log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
    } catch (error) {
      client.log.error(client.log.colour.red(error));
    }

  } else if (message.channel.name.startsWith('sealing-stone-')) {
    try {
      message.channel.delete()
      // log
      const embed = new client.Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setTitle("Ticket Closed")
        .setColor(client.config.colour)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
        .setTimestamp();
      client.channels.cache.get(client.config.logChannel).send({
        embed
      })
      client.log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
    } catch (error) {
      client.log.error(client.log.colour.red(error));
    }

  } else if (message.channel.name.startsWith('request-')) {
    try {
      message.channel.delete()
      // log
      const embed = new client.Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setTitle("Ticket Closed")
        .setColor(client.config.colour)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
        .setTimestamp();
      client.channels.cache.get(client.config.logChannel).send({
        embed
      })
      client.log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
    } catch (error) {
      client.log.error(client.log.colour.red(error));
    }
    
  } else { 
    const notTicket = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.incorrectChannel)
    return message.channel.send(notTicket);

  }
}
// command ends here