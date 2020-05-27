exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    client.log.debug(client.channels.cache.find(c => c.topic === (args[0])))
    if (message.guild.channels.cache.find(c => c.topic === args[0])) {
        client.log.debug('success')
        client.log.debug(r.id)
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noAffinity)
        return message.channel.send(noPerm);
    }
    // placeholder
    
    client.log.console(args);
    // command ends here
}