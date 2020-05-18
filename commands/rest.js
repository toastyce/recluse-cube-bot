exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    const embed = new client.Discord.MessageEmbed()
    .setTitle("HP and EP fully restored!")
    .setColor(client.config.colour)
    .setTimestamp()
    .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
  message.channel.send({ embed })
    // command ends here
}
