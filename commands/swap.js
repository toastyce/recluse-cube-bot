exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    let fromMem = message.mentions.members.first();
    let toMem = message.mentions.members.last();
    let fromMemRole = message.mentions.members.first().roles.highest;
    let toMemRole = message.mentions.members.last().roles.highest;
    fromMem.roles.add(`${toMemRole.id}`).catch(client.log.error).then(
        fromMem.roles.remove(`${fromMemRole.id}`).catch(client.log.error).then(
            toMem.roles.add(`${fromMemRole.id}`).catch(client.log.error).then(
                toMem.roles.remove(`${toMemRole.id}`).catch(client.log.error).then())));
    const embed = new client.Discord.MessageEmbed()
        .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
        .setTitle("Swappy")
        .setColor(client.config.colour)
        .setDescription(client.starray.swappy.replace("{{a}}", `<@${toMem.id}>`).replace("{{b}}", `${fromMemRole.name}`).replace("{{c}}", `<@${fromMem.id}>`).replace("{{d}}", `${toMemRole.name}`))
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
        .setTimestamp();
    const logEmbed = new client.Discord.MessageEmbed()
        .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
        .setTitle("Swappy")
        .setColor(client.config.colour)
        .setDescription(client.starray.logSwappy.replace("{{a}}", `<@${message.author.id}>`).replace("{{b}}", `<@${fromMem.id}>`).replace("{{c}}", `<@${toMem.id}>`))
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
        .setTimestamp();
    message.channel.send(embed).then(
        message.guild.channels.cache.get(client.config.logChannel).send(logEmbed).catch(client.log.error)
    )
    // command ends here
}