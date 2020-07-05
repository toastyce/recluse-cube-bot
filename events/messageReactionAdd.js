module.exports = async (client, reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    if (reaction.message.partial) {
        await reaction.message.fetch();
    }
    //if (!reaction.message.embed) return;
    if (user.bot) return;
    client.log.debug(`${reaction.message.author.id}`)
    if (reaction.message.author.id == client.config.botID) {
        try {
        const chan = reaction.message.embeds[0].fields[0].value
        client.log.debug(`channel ID:${chan}`)
        if (!client.channels.cache.get(chan)) return;
        const ch = client.channels.cache.get(chan);
        if (ch.permissionOverwrites.get(user.id)) {
            ch.permissionOverwrites.get(user.id).delete();
        }
        ch.createOverwrite(user.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        console.log(reaction.message.embeds[0].fields[0].value)
        if (reaction.partial) await reaction.fetch();
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    }
    catch (error) {
        client.log.error(error);
    }
    }
};
///sent.react("☑️");
///sent.react("📢");
///sent.react("👁‍🗨");