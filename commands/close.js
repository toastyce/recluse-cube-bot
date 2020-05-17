exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  if (message.channel.name.startsWith('ticket-')) {
    try {
      // TODO: Add member filter to DM logs
      message.channel.delete()
      // log
      const embed = new client.Discord.MessageEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setTitle("Ticket Closed")
        .setColor(client.config.colour)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .setFooter(`${client.description} - v${client.version}`)
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
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setTitle("Ticket Closed")
        .setColor(client.config.colour)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .setFooter(`${client.description} - v${client.version}`)
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
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setTitle("Ticket Closed")
        .setColor(client.config.colour)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .setFooter(`${client.description} - v${client.version}`)
        .setTimestamp();
      client.channels.cache.get(client.config.logChannel).send({
        embed
      })
      client.log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
    } catch (error) {
      client.log.error(client.log.colour.red(error));
    }
  } else { // // !message.channel.name.length() == 15 &&
    if (client.config.useEmbeds) {
      const notTicket = new client.Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(`:x: **This command can only be used within a ticket channel**`)
      return message.channel.send(notTicket);
    } else {
      return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
    }
  }
}
// command ends here