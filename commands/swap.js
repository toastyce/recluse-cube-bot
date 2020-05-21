exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    var arr = [];
    message.guild.roles.cache.forEach(role => arr.push(`${role.name}`) );
    client.log.info(`${arr.length}`);
    let fromMem = message.mentions.members.first();
    let toMem = message.mentions.members.last();
    let fromMemRole = message.mentions.members.first().roles.highest;
    let toMemRole = message.mentions.members.last().roles.highest;
fromMem.roles.add(`${toMemRole.id}`).catch(client.log.error).then(
    fromMem.roles.remove(`${fromMemRole.id}`).catch(client.log.error).then(
        toMem.roles.add(`${fromMemRole.id}`).catch(client.log.error).then(
            toMem.roles.remove(`${toMemRole.id}`).catch(client.log.error).then(
            ))));
    // command ends here
}