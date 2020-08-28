const fs = require("fs");
module.exports = (client, message) => {

    // log private channels
    if (message.channel.name.startsWith('ticket-')) {
        try {
            if (!fs.existsSync(`./tickets/${message.channel.name}.txt`)) {
                fs.createWriteStream(`./tickets/${message.channel.name}.txt`);; //file created
            }
        } catch (err) {
            client.log.debug(err)
        }
        fs.appendFile(`./tickets/${message.channel.name}.txt`, `\n` + message.author.tag + ` | ` + message.content, function (err) {
            if (err)
                return client.log.error(err);
        });
    }

    if (message.channel.name.startsWith('rs-')) {
        try {
            if (!fs.existsSync(`./tickets/${message.channel.name}.txt`)) {
                fs.createWriteStream(`./tickets/${message.channel.name}.txt`);; //file created
            }
        } catch (err) {
            client.log.debug(err)
        }
        fs.appendFile(`./tickets/${message.channel.name}.txt`, `\n` + message.author.tag + ` | ` + message.content, function (err) {
            if (err)
                return client.log.error(err);
        });
    }

    if (message.channel.name.startsWith('sealing-stone-')) {
        try {
            if (!fs.existsSync(`./tickets/${message.channel.name}.txt`)) {
                fs.createWriteStream(`./tickets/${message.channel.name}.txt`);; //file created
            }
        } catch (err) {
            client.log.debug(err)
        }
        fs.appendFile(`./tickets/${message.channel.name}.txt`, `\n` + message.author.tag + ` | ` + message.content, function (err) {
            if (err)
                return client.log.error(err);
        });
    }

    if (message.channel.name.startsWith('request-')) {
        try {
            if (!fs.existsSync(`./tickets/${message.channel.name}.txt`)) {
                fs.createWriteStream(`./tickets/${message.channel.name}.txt`);; //file created
            }
        } catch (err) {
            client.log.debug(err)
        }
        fs.appendFile(`./tickets/${message.channel.name}.txt`, `\n` + message.author.tag + ` | ` + message.content, function (err) {
            if (err)
                return client.log.error(err);
        });
    } 
     if (message.channel.name.startsWith('azoth')) {
        try {
            if (!fs.existsSync(`./../OneDrive/${message.channel.name}.csv`)) {
                fs.createWriteStream(`./../OneDrive/${message.channel.name}.csv`);; //file created
            }
        } catch (err) {
            client.log.debug(err)
        }
        var m1 = message.content.match(/([^,]*),(.*)/)
        fs.appendFile(`./../OneDrive/${message.channel.name}.csv`, `\n` + `"${m1[1]}"` + `,` + `"${m1[2]}"`, function (err)  {
            if (err)
                return client.log.error(err);
        });
    }

    //clear discord invites -- except by mods
    if (message.content.includes('discord.gg/' || 'discordapp.com/invite/')) { //if it contains an invite link
        if (!message.member.roles.cache.find(r => r.id === client.config.supportRole)) {
            message.delete() //delete the message
                .then(message.channel.send('Link Deleted:\n**Invite links are not permitted on this server**'))
        }
    }

    //clear non links in twitter directory
    if (message.channel.id == `${client.config.dirChannel}`) {
        if (message.author.bot) return;
        if (!message.content.includes('twitter.com/')) { //if it contains an invite link
            message.delete() //delete the message
                .then(message.channel.send('Message Deleted:\n**Only twitter links are allowed in this channel.**'))
        }
    }


    // filter messages for commands
    if (message.author.bot) return;
    if (message.content.startsWith(client.config.prefix)) {
        if (message.content.indexOf(client.config.prefix) !== 0) {
            if (message.channel.name.startsWith('registration-')) {
                return message.delete();
            } else if (message.channel.name.startsWith('bot-')) {
                return message.delete();
            } else return;
        };

        // command prefix and formatting
        // const args = message.content.slice(client.config.prefix.length).trim().split(/"/);
        let input = message;
        input = input.toString();
        const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
        const args = [];
        input.match(regex).forEach(element => {
            if (!element) return;
            return args.push(element.replace(/"/g, ''));
        });

        let command = args.shift().toLowerCase();
        command = command.slice(client.config.prefix.length);
        client.log.console(`${message.author.tag} used the '${command}' command`);
        client.log.console(args);

        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);

        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;

        // Run the command
        cmd.run(client, message, args);
    }
};