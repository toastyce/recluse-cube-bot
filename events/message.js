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