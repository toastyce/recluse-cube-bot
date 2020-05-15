module.exports = (client, message) => {
    // filter messages for commands
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // command prefix and formatting
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    client.log.console(`${message.author.tag} used the '${command}' command`)
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
  };