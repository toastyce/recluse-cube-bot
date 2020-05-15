exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    const embed = new client.Discord.MessageEmbed()
      .setTitle("Ping Pong!")
      .setColor(client.config.colour)
      .setTimestamp()
      .addField("API Latency", `${Math.round(message.client.ws.ping)}ms`, true)
      .setImage('http://trailsinthedatabase.com/itp/1/pc/H_KAO031.png')
    message.channel.send({ embed })
    // command ends here
}
