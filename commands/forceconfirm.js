exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    if (!message.member.roles.cache.find(r => r.id=== client.config.supportRole)) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    const newMember = args[0].replace('<@', '').replace('>', '').replace('!', '');
    const characterName = args[1];
    const roleName = args[2];
    const roleColor = args[3];
    const roleAffinity = args[4].toLowerCase();
    let member = message.mentions.members.first();

    // error checks
    if ((!newMember) || (!characterName) || (!roleName) || (!roleColor) || (!roleAffinity)) {
        const invalidInput = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.invalidInput);
        client.log.debug("We somehow ended up here.");
        return message.channel.send(invalidInput);
    }
    if (member == newMember) {
        client.log.debug("Mention checks out.")
    }
    client.log.debug(member);
    var affinityChoice = client.config.darkRole;
    if (roleAffinity.startsWith('light')) {
        affinityChoice = client.config.lightRole;
    }
    client.log.debug(`Affinity Role: ${affinityChoice}`)


    try {
        // Create a new role with data and a reason
        client.log.debug("creating role...");
        message.guild.roles.create({
                data: {
                    name: roleName,
                    color: roleColor,
                },
                reason: `Mod-overwrite of Registration for ${characterName}`,
            })
            .then(
                role => member.roles.add(role))
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
    } catch (error) {
        client.log.debug("creating role failed.");
    }

    // command ends here
}