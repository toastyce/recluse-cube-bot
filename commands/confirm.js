exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    const newMember = args[0].replace('<@', '').replace('>', '').replace('!', '');
    const characterName = args[1];
    const roleName = args[2];
    const roleColor = args[3];
    const roleAffinity = args[4];
    const userId = client.users.fetch(newMember);
    let member = message.mentions.members.first();
    if (member == newMember) {
        client.log.debug("Mention checks out.")
    }
    client.log.debug(member);
    var affinitychoice = client.config.darkRole;
    if (roleAffinity.startsWith('light')) {
        affinityChoice = client.config.lightRole;
    }
    client.log.debug(`Affinity Role: ${affinityChoice}`)
    if (!message.channel.name.startsWith('sealing-stone-')) {
        const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.incorrectChannel);
        client.log.debug("We somehow ended up here.");
        return message.channel.send(notTicket);
    };

    // Create a new role with data and a reason
    client.log.debug("creating role...");
    message.guild.roles.create({
            data: {
                name: roleName,
                color: roleColor,
            },
            reason: `New Registration for ${characterName}`,
        })
        .then(role => member.roles.add(role))
        .catch(client.log.error);
    // assign roles and name to member
    let affinityRole = message.guild.roles.cache.get(`${affinityChoice}`)
    member.setNickname(characterName).catch(client.log.error).then(
        member.roles.add(`${client.config.memberRole}`).catch(client.log.error).then(
            member.roles.add(affinityRole).catch(client.log.error).then(
                member.roles.remove(client.config.juniorRole).catch(client.log.error)
            )
        )
    );

    // and finally close the ticket
    try {
        message.channel.delete()
        // log
        const embed = new client.Discord.MessageEmbed()
            .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setTitle("Ticket Closed")
            .setColor(client.config.colour)
            .addField("Username", `<@${newMember}>`)
            .addField("Affinity", roleAffinity)
            .addField("Role Name", roleName)
            .addField("Role Color", roleColor)
            .addField("Character Name", characterName)
            .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
            .setTimestamp();
        client.channels.cache.get(client.config.logChannel).send({
            embed
        })
        client.log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
    } catch (error) {
        client.log.error(client.log.colour.red(error));
    }

    //send log to admin log channel
    try {
        client.channels.cache.get(client.config.adminChannel).send(`${characterName}'s Registration:`, {
            files: [`./tickets/${message.channel.name}.txt`]
        })
    } catch (error) {
        client.log.error(client.log.colour.red(error));
    }
    
    // command ends here
}