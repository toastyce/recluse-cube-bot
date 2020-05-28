exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    var event = new Object();
    var forceEnd = false; // determines if the collector was forced to forceEnd
    var d = new Date();
    var postid;
    var roomname;

    if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    if (!message.channel.name.startsWith('request-')) {
        const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.incorrectChannel)
        return message.channel.send(notTicket);
    }

    const embed = new client.Discord.MessageEmbed()
        .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
        .setColor(client.config.color)
        .setTitle(client.starray.reqTitle)
        .setDescription(client.starray.reqOne)
        .setTimestamp()
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    message.channel.send(embed)

    var startTime = Date.now();
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {
        time: 10000000
    });

    // start collector
    collector.on("collect", m => {
        if (m.content === "exit") {
            forceEnd = true;
            collector.stop();

        } else {
            if (event.name === undefined) {
                // if the event has not been given a name
                event.name = m.content;
                // format topic string
                roomname = event.name.replace(/\s/g, "-");
                var specialChars = "!@#$^&%*()+=[]\/{}|:<>?,.";
                for (var i = 0; i < specialChars.length; i++) {
                    roomname = roomname.replace(new RegExp("\\" + specialChars[i], "gi"), "");
                }

                const embed1 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .setDescription(client.starray.reqTwo)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed1)

            } else if (event.date === undefined && event.name !== undefined) {
                //if the event has not been given a date
                var split = m.content.split('/');
                split[0] = parseInt(split[0]); //month
                split[1] = parseInt(split[1]); //day
                split[2] = parseInt(split[2]); //year
                var currDate = new Date();

                // check if date has already passed
                if (split[2] < currDate.getFullYear() || (split[2] <= currDate.getFullYear() && (split[0] - 1) < currDate.getMonth()) || (split[2] <= currDate.getFullYear() && (split[0] - 1) <= currDate.getMonth() && split[1] < currDate.getDay())) {
                    const embed2e = new client.Discord.MessageEmbed()
                        .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                        .setColor(client.config.color)
                        .setTitle(client.starray.reqTitle)
                        .setDescription(client.starray.reqTwoError)
                        .setTimestamp()
                        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                    message.channel.send(embed2e)

                    event.date = d.toDateString();
                    client.log.debug("Date: " + d.getMonth() + d.getDay() + d.getFullYear());
                    client.log.debug("Date: " + d.toDateString());

                    const embed2 = new client.Discord.MessageEmbed()
                        .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                        .setColor(client.config.color)
                        .setTitle(client.starray.reqTitle)
                        .addField("Event", `${event.name}`)
                        .addField("Date", `${event.date}`)
                        .setDescription(client.starray.reqThree)
                        .setTimestamp()
                        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                    message.channel.send(embed2)

                } else {
                    d.setMonth(split[0] - 1, split[1]);
                    d.setYear(split[2]);
                    event.date = d.toDateString();
                    client.log.debug("Date: " + d.getMonth() + d.getDay() + d.getFullYear());
                    client.log.debug("Date: " + d.toDateString());

                    const embed3 = new client.Discord.MessageEmbed()
                        .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                        .setColor(client.config.color)
                        .setTitle(client.starray.reqTitle)
                        .addField("Event", `${event.name}`)
                        .addField("Date", `${event.date}`)
                        .setDescription(client.starray.reqThree)
                        .setTimestamp()
                        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                    message.channel.send(embed3)

                }
            } else if (event.part === undefined && event.date !== undefined && event.name !== undefined) {
                // Number of participants
                event.part = m.content;

                const embed4 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color).setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .setDescription(client.starray.reqFour)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed4)

            } else if (event.spectators === undefined && event.part !== undefined && event.date !== undefined && event.name !== undefined) {
                //  Allow spectators
                event.spectators = m.content;

                const embed5 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .setDescription(client.starray.reqFive)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed5)

            } else if (event.affinity === undefined && event.spectators !== undefined && event.part !== undefined && event.date !== undefined && event.name !== undefined) {
                // Allowed affinities
                event.affinity = m.content;

                const embed6 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .addField("Affinity:", `${event.affinity}`)
                    .setDescription(client.starray.reqSix)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed6)

            } else if (event.contact === undefined && event.affinity !== undefined && event.spectators !== undefined && event.part !== undefined && event.date !== undefined && event.name !== undefined) {
                // if the contact hasn't been defined yet
                console.log(m.content);
                var contact = m.content;
                event.contact = contact;
                console.log("event description: ", event.desc);

                const embed7 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .addField("Affinity:", `${event.affinity}`)
                    .addField("Description", `[Contact]: ${event.contact}`)
                    .setDescription(client.starray.reqSeven)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed7)

            } else if (event.location === undefined && event.contact !== undefined && event.affinity !== undefined && event.spectators !== undefined && event.part !== undefined && event.date !== undefined && event.name !== undefined) {
                // if the location hasn't been defined yet
                console.log(m.content);
                var location = m.content;
                event.location = location;
                console.log("event description: ", event.desc);

                const embed7 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .addField("Affinity:", `${event.affinity}`)
                    .addField("Description", `[Contact]: ${event.contact}\n[Location]: ${event.location}`)
                    .setDescription(client.starray.reqEight)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed7)

            } else if (event.desc === undefined && event.location !== undefined && event.contact !== undefined && event.affinity !== undefined && event.spectators !== undefined && event.part !== undefined && event.date !== undefined && event.name !== undefined) {
                // if the description hasn't been defined yet
                console.log(m.content);
                var desc = m.content;
                event.desc = desc.substring(0, 1000) + '\n\n[...]';
                console.log("event description: ", event.desc);
                // FIXME: get rid of unexpected token error

                const embed7 = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .addField("Affinity:", `${event.affinity}`)
                    .addField("Description", `[Contact]: ${event.contact}\n[Location]: ${event.location}\n [Details]: ${event.desc}`)
                    .setDescription(client.starray.reqEnd)
                    .setTimestamp()
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
                message.channel.send(embed7)

            } else if (event.desc !== undefined && m.content.toLowerCase() === "yes") {
                collector.stop();
            }
        }
    });

    collector.on("end", c => {
        // when the collection has stopped
        console.log(forceEnd);
        if (forceEnd == true) {
            // if the collector has been forced to end

            const embed8 = new client.Discord.MessageEmbed()
                .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                .setColor(client.config.color)
                .setTitle(client.starray.reqTitle)
                .setDescription("Event creation has been cancelled");
            message.channel.send(embed8)

        } else if (Date.now() >= startTime + 1000000) {
            // if time ran out

            const embed9 = new client.Discord.MessageEmbed()
                .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                .setColor(client.config.color)
                .setTitle(client.starray.reqTitle)
                .setDescription("Event creation has timed out")
                .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
            message.channel.send(embed9)

        } else {
            // if all the parameters have been given

            const embeda = new client.Discord.MessageEmbed()
                .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                .setColor(client.config.color)
                .setTitle(client.starray.reqTitle)
                .addField("Event", `${event.name}`)
                .addField("Date", `${event.date}`)
                .addField("Seeking # of Participants:", `${event.part}`)
                .addField("Spectators", `${event.spectators}`)
                .addField("Affinity:", `${event.affinity}`)
                .setDescription("Description", `[Contact]: ${event.contact}\n[Location]: ${event.location}\n [Details]: ${event.desc}`)
                .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
            message.channel.send(embeda).then(message.channel.send(client.starray.reqSuccess))

            // First, we need to create the room
            message.guild.channels.create(`rs-${roomname}`, {
                type: 'text',
                permissions: {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false
                }
                // then, set permissions
            
            }).then(async c => {

                postid = c.id;
                c.setParent(client.config.roomCat);
                c.createOverwrite(message.guild.roles.everyone, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false
                })

                c.createOverwrite(message.author.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true
                })

                if (event.spectators.toLowerCase() == 'yes') {
                    let spectatorRole = message.guild.roles.cache.get(`${client.config.memberRole}`)
                    c.createOverwrite(spectatorRole, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: false
                    })
                }

                //await c.send(client.starray.tagSupport.replace("{{role}}", `<@&${client.config.supportRole}>`));
                await c.send(client.starray.reqCreated.replace("{{user}}", `<${message.author}>`))

                const created = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("PostID", `${postid}`)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .addField("Affinity:", `${event.affinity}`)
                    .setDescription("Description", `[Contact]: ${event.contact}\n[Location]: ${event.location}\n [Details]: ${event.desc}`)
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))

                const welcome = new client.Discord.MessageEmbed()
                    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
                    .setColor(client.config.color)
                    .setTitle(client.starray.reqTitle)
                    .addField("PostID", `${postid}`)
                    .addField("Event", `${event.name}`)
                    .addField("Date", `${event.date}`)
                    .addField("Seeking # of Participants:", `${event.part}`)
                    .addField("Spectators", `${event.spectators}`)
                    .addField("Affinity:", `${event.affinity}`)
                    .setDescription("Description", `[Contact]: ${event.contact}\n[Location]: ${event.location}\n [Details]: ${event.desc}`)
                    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))

                client.channels.cache.get(client.config.postChannel).send(created).then(sent => {
                    // 'sent' is that message you just sent
                    sent.react("☑️");
                    //sent.react("👀");
                    console.log(postid);
                });

                let w = await c.send(welcome)
                await w.pin();
                await c.setTopic(`"${message.author}" "${postid}" "${event.name}"`);

            }).then(async c => {

                // finally, close the channel
                try {
                    message.channel.delete();

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
            });
        }
    });

    // command ends here
}