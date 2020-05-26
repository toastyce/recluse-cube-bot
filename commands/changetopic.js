exports.run = (client, message, args) => {
    // TODO: change topic with context
    
    // command starts here
    message.delete();
    if (!message.member.roles.cache.find(r => r.id=== client.config.supportRole)) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }

    // if (!message.channel.name.startsWith('request-')) {
    //     const notTicket = new client.Discord.MessageEmbed()
    //         .setColor("#E74C3C")
    //         .setDescription(client.starray.incorrectChannel)
    //     return message.channel.send(notTicket);
    // }

    // format topic string
    var roomname = args[0].replace(/\s/g, "-");
    var specialChars = "!@#$^&%*()+=[]\/{}|:<>?,.";
    for (var i = 0; i < specialChars.length; i++) {
        roomname = roomname.replace(new RegExp("\\" + specialChars[i], "gi"), "");
    }

    const confirmchange = new client.Discord.MessageEmbed()
        .setColor("#32CD32")
        .setDescription(client.starray.roomNameSet)
    const embed = new client.Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setTitle("Topic change")
        .setColor(client.config.colour)
        .setDescription(`\`${roomname}\``)
        .addField("Username", message.author, true)
        .addField("Channel", message.channel, true)
        .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
        .setTimestamp();

    // set topic
    message.channel.setTopic(`${roomname}`).then(
        client.channels.cache.get(client.config.logChannel).send({
            embed
        }).then(
            message.channel.send(confirmchange)
        ));
    // command ends here
}