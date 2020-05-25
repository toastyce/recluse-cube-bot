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

    if (!args[0]) {

        client.log.debug("no affinity specified.");
        const notAffinity = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noAffinity)
        return message.channel.send(notAffinity);
    } else if (args[0].toLowerCase() == "light") {
        var addRole = message.guild.roles.cache.get(`${client.config.lightRole}`)
        client.log.debug("light affinity specified.");
    } else if (args[0].toLowerCase() == "dark") {
        var addRole = message.guild.roles.cache.get(`${client.config.darkRole}`)
        client.log.debug("dark affinity specified.");
    } else {
        client.log.debug("We somehow ended up here.");
        const notAffinity = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noAffinity)
        return message.channel.send(notAffinity);
    }
    message.channel.createOverwrite(addRole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
    })


    client.log.console(args);
    // command ends here
}