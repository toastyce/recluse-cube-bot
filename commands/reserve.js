exports.run = (client, message, args) => {
  message.delete();

  let topic = args.join(" ");
  let id = message.author.id.toString().substr(0, 4) + message.author.discriminator;
  let chan = `request-${id}`;
  
  if (message.guild.channels.cache.find(channel => channel.name === chan)) {
    if (client.config.useEmbeds) {
      const err1 = new client.Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(`:x: You already have an open request.`)
      return message.channel.send(err1)
    } else {
      message.channel.send(`:x: You already have an open request.`)
    }
  };

  message.guild.channels.create(`request-${id}`, {
    type: 'text',
    permissions: {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    }
  }).then(async c => {
    c.setParent(client.config.ticketsCat);
    let supportRole = message.guild.roles.cache.get(client.config.supportRole)
    if (!supportRole) return message.channel.send(":x: No **Support Team** role found.");
    c.createOverwrite(message.guild.roles.everyone, {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    })
    c.createOverwrite(message.member, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    })
    c.createOverwrite(supportRole, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    })

    c.setTopic(`${message.author} | ${topic}`);
    if (client.config.tagHereOnly) {
      await c.send(`@here, a new user has registered.\n`);
    } else {
      await c.send(`<@&${client.config.supportRole}>, a new user has registered.\n`);
    };

    if (client.config.ticketImage) {
      await c.send(`__**Here's your request, ${message.author}**__`, {
        files: [`./image.png`]
      })
    } else {
      await c.send(`__**Here's your request, ${message.author}**__`)
    }

    const created = new client.Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setDescription(`Your request (${c}) has been created.\nPlease read the information sent and follow any instructions given.`)
      .setTimestamp();
    const welcome = new client.Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setDescription(`**New registration:** \`${topic}\`\n\n${client.config.ticketText}`)
      
      message.channel.send(created)
      let w = await c.send(welcome)
      await w.pin();
    
      const embed = new client.Discord.MessageEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setTitle("New registration")
        .setColor(client.config.colour)
        .setDescription(`\`${topic}\``)
        .addField("Username", message.author, true)
        .addField("Channel", c, true)
        .setFooter(`${client.description} - v${client.version}`)
        .setTimestamp();
      client.channels.cache.get(client.config.logChannel).send({
        embed
      });
    client.log.info(`${message.author.tag} created a new registration (#sealing-stone-${id})`)
  })
  // command ends here
}
