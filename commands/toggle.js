exports.run = (client, message, args) => {
    //TODO: A toggle for turning on and off spectators for a room
    // command starts here
    message.delete();
    const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
    const topic = [];
    message.channel.topic.match(regex).forEach(element => {
        if (!element) return;
        return topic.push(element.replace(/"/g, ''));
    });
    if (!message.author.id == topic[0].replace('<@', '').replace('>', '').replace('!', '')) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }
    try {
        let memberRole = message.guild.roles.cache.get(`${client.config.memberRole}`)
        console.log(`channel ID:${message.channel.id}`)
        console.log(`channel ID:${memberRole.id}`)
        if (message.channel.permissionOverwrites.get(memberRole.id)) {
            message.channel.permissionOverwrites.get(memberRole.id).delete();
            return;
        }
        message.channel.createOverwrite(memberRole, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false
        })
    } catch (err) {
        client.log.debug(err)
    }
    // command ends here
}