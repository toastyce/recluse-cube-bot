exports.run = (client, message, args) => {
    // command starts here
    const fs = require("fs");
    message.delete();
    if (!message.member.roles.cache.find(r => r.id === client.config.supportRole)) {
        const noPerm = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.noPerm)
        return message.channel.send(noPerm);
    }
    if (!args[0]) {
        args[0] = '20';
    }

    // placeholder
    let messagecount = parseInt(args[0]);
    message.channel.messages.fetch({ limit: messagecount })
        .then(async m => {
            try {
                if (!fs.existsSync(`./tickets/Purged.txt`)) {
                    fs.createWriteStream(`./tickets/Purged.txt`);; //file created
                }
            } catch (err) {
                client.log.debug(err)
            }
            m.forEach(m => fs.appendFile(`./tickets/Purged.txt`, `\n` + m.author.tag + ` | ` + m.content, function (err) {
                if (err)
                    return client.log.error(err);
            }));
            message.channel.bulkDelete(m)
        }
            //messages => message.channel.bulkDelete(messages)
        );
    //send log to admin log channel
    try {
        client.channels.cache.get(client.config.adminChannel).send(`Text Purge Log:`, {
            files: [`./tickets/Purged.txt`]
        })
    } catch (error) {
        client.log.error(client.log.colour.red(error));
    }
    client.log.console(args);
    // command ends here
}