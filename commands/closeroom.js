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
            var split = message.channel.topic;
            var sets = [];
            const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
            split.match(regex).forEach(element => {
                if (!element) return;
                return sets.push(element.replace(/"/g, ''));
            });
            client.log.debug(sets[1]);
            // FIXME
            var ch = client.channels.cache.get(client.config.postChannel);
            client.log.debug(ch.id);
            ch.messages.fetch(`${sets[1]}`).then(m => {
                m.delete();
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
            client.log.error(error);
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
                    allow: ['VIEW_CHANNEL'],
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