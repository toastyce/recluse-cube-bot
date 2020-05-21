exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    const embed = new client.Discord.MessageEmbed()
      .setTitle(client.starray.ping)
      .setColor(client.config.colour)
      .setTimestamp()
      .addField("API Latency", `${Math.round(message.client.ws.ping)}ms`, true)
      .setImage(client.starray.oImg)
    message.channel.send({ embed })
    // command ends here
}
