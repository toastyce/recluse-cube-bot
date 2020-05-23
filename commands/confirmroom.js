exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    if (!args[0]) {
        var specValue = "denied";
    } else if (args[0] == "allow") {
        var specValue = args[0].toLowerCase();
    } else if (args[0] != "allow") {
        var specValue = "denied";
    } else {
        client.log.debug("We somehow ended up here.");
        var specValue = "denied";
    }
    const spectators = specValue;

    if (!message.channel.name.startsWith('request-')) {
        const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.incorrectChannel)
        return message.channel.send(notTicket);
    }

    // First, we need to create the room
    message.guild.channels.create(`${message.channel.topic}`, {
        type: 'text',
        permissions: {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
        }
        // then, set permissions
    }).then(async c => {
        c.setParent(client.config.roomCat);
        c.createOverwrite(message.guild.roles.everyone, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
        })
        message.mentions.members.forEach(m =>
            c.createOverwrite(m, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            })
        )

        if (spectators == 'allow') {
            let spectatorRole = message.guild.roles.cache.get(`${client.config.memberRole}`)
            c.createOverwrite(spectatorRole, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: false
            })
        }
    });

    // finally, close the channel
    try {
        message.channel.delete()
        // log
        const embed = new client.Discord.MessageEmbed()
            .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setTitle("Ticket Closed")
            .setColor(client.config.colour)
            .addField("Username", message.author, true)
            .addField("Channel", message.channel.name, true)
            .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
            .setTimestamp();
        client.channels.cache.get(client.config.logChannel).send({
            embed
        })
        client.log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
    } catch (error) {
        client.log.error(client.log.colour.red(error));
    }

    try {
        client.channels.cache.get(client.config.adminChannel).send(`~~Room Request Closed:~~`, {
            files: [`./tickets/${message.channel.name}.txt`]
        })
    } catch (error) {
        client.log.error(client.log.colour.red(error));
    }
    // command ends here
}