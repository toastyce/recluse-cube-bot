exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    const embed = new client.Discord.MessageEmbed()
    .setTitle(client.starray.fullyRest)
    .setColor(client.config.colour)
    .setTimestamp()
    .addField("API Latency", `${Math.round(message.client.ws.ping)}ms`, true)
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));
  message.channel.send({ embed })
    // command ends here
}
