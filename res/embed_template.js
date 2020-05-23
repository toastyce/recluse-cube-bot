const embed = new client.Discord.MessageEmbed()
.setAuthor(`<${client.user.username}>`, client.user.avatarURL)
.setTitle("Titlehere")
.setColor(client.config.colour)
.setDescription("Textfieldhere")
.setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
.setTimestamp();
message.channel.send(embed)

if (!message.channel.name.startsWith('request-')) {
    const notTicket = new client.Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(client.starray.incorrectChannel)
    return message.channel.send(notTicket);
}