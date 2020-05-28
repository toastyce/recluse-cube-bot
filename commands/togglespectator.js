exports.run = (client, message, args) => {
    //TODO: A toggle for turning on and off spectators for a room

    // command starts here
    message.delete();
    client.log(message.channel.topic)

    var addRole = message.guild.roles.cache.get(`${client.config.memberRole}`)

    message.channel.createOverwrite(addRole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: false
    })


    client.log.console(args);
    // command ends here
}