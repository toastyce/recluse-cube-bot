exports.run = (client, message, args) => {
  message.delete();

  let topic = args.join(" ");
  let id = message.author.id.toString().substr(0, 4) + message.author.discriminator;
  let chan = `ticket-${id}`;

  if (message.guild.channels.cache.find(channel => channel.name === chan)) {
    const err1 = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.openExist)
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));
    return message.channel.send(err1)
  };

  message.guild.channels.create(`ticket-${id}`, {
    type: 'text',
    permissions: {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    }
  }).then(async c => {
    c.setParent(client.config.ticketsCat);
    let supportRole = message.guild.roles.cache.get(client.config.supportRole)
    if (!supportRole) return message.channel.send(client.starray.noSupportRoleErr);
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
    await c.send(client.starray.tagSupport.replace("{{role}}", `<@&${client.config.supportRole}>`));
    await c.send(client.starray.requestCreated.replace("{{user}}", `<${message.author}>`))

    const created = new client.Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setDescription(client.starray.requestDetails.replace("{{channel}}", `(${c})`))
      .setTimestamp()
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));
    const welcome = new client.Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setDescription(client.starray.requestDesc.replace("{{topic}}", `${topic}`))
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));

    message.channel.send(created)
    let w = await c.send(welcome)
    await w.pin();

    const embed = new client.Discord.MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setTitle("New ticket")
      .setColor(client.config.colour)
      .setDescription(`\`${topic}\``)
      .addField("Username", message.author, true)
      .addField("Channel", c, true)
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
      .setTimestamp();
    client.channels.cache.get(client.config.logChannel).send({
      embed
    });

    client.log.info(`${message.author.tag} created a new registration (#ticket-${id})`)
  })
  // command ends here
}