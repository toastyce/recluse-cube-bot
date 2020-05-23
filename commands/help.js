exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    // placeholder
    if (!message.channel.name.startsWith('request-')) {
        const noHelp = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noHelp)
        message.channel.send(noHelp);
    }
    client.log.console(args);
    // command ends here
}