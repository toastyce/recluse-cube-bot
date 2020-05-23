exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    message.channel.members.forEach(m =>
        client.log.debug(m)
    )
    // command ends here
}
