exports.run = (client, message, args) => {
    // command starts here
    message.delete();

    client.log.console(args);
    // command ends here
}
