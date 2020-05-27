exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    if (!message.member.roles.cache.find(r => r.topic === args[0])) {
        client.log.debug('success')
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noAffinity)
        return message.channel.send(noPerm);
    }
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