exports.run = (client, message, args) => {
    //TODO: A toggle for turning on and off spectators for a room

    // command starts here
    message.delete();
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    var addRole = message.guild.roles.cache.get(`${client.config.memberRole}`)

    message.channel.createOverwrite(addRole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: false
    })


    client.log.console(args);
    // command ends here
}