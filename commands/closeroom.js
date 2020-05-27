exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    if (message.channel.name.startsWith('rs-')) {
        try {
            var split = message.channel.topic.split(' ');
            client.log.debug(split[0]);
            client.channels.cache.get(client.config.postChannel).messages.fetch(split[0]).then(async m => {
                try {
                    await m.delete();
                    console.log('Done.');
                } catch (err) {
                    console.error(err);
                }
            })

            // log
            const embed = new client.Discord.MessageEmbed()
                .setAuthor(`${client.user.username}`, client.user.avatarURL)
                .setTitle("Room Closed")
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
    } else {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    };

    message.channel.setParent(client.config.archiveCat)
        .then(async c => {

            let supportRole = message.guild.roles.cache.get(client.config.supportRole)
            let memberRole = message.guild.roles.cache.get(client.config.memberRole)
            let juniorRole = message.guild.roles.cache.get(client.config.juniorRole)
            message.channel.overwritePermissions([{
                    id: memberRole,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: juniorRole,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: supportRole,
                    allow: ['VIEW_CHANNEL'],
                },
            ])
            message.channel.members.forEach(m =>
                c.createOverwrite(m, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: false
                })
            )

            c.setTopic(`${message.channel.topic} [ARCHIVED]`);

            const closed = new client.Discord.MessageEmbed()
                .setColor(client.config.colour)
                .setDescription(client.starray.roomClosed.replace("{{channel}}", `(${c})`))
                .setTimestamp()
                .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));

            message.channel.send(closed)

            const embed = new client.Discord.MessageEmbed()
                .setAuthor(`${client.user.username}`, client.user.avatarURL)
                .setTitle("Room closed")
                .setColor(client.config.colour)
                .setDescription(`\`${message.channel.name}\``)
                .addField("Username", message.author, true)
                .addField("Channel", c, true)
                .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                .setTimestamp();
            client.channels.cache.get(client.config.logChannel).send({
                embed
            });
            client.log.info(`${message.author.tag} closed the room: (${message.channel.name})`)
        })
    // command ends here
}