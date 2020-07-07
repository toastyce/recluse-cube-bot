exports.run = (client, message, args) => {
  message.delete();
  if (!message.member.roles.cache.find(r => r.id=== client.config.memberRole)) {
    const noPerm = new client.Discord.MessageEmbed()
    .setColor("#E74C3C")
    .setDescription(client.starray.changeChar)
  return message.channel.send(noPerm);
  }

  let topic = `${message.member.id}`;
  let id = message.member.id.toString().substr(0, 4);
  let chan = `sealing-stone-${id}`;

  if (message.guild.channels.cache.find(channel => channel.name === chan)) {
    const err1 = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.openExist)
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    return message.channel.send(err1)
  };

  message.guild.channels.create(`sealing-stone-${id}`, {
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
    await c.send(client.starray.registerCreated.replace("{{user}}", `<${message.author}>`))

    const created = new client.Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setDescription(client.starray.registerDetails.replace("{{channel}}", `(${c})`))
      .setTimestamp()
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));

    const welcome = new client.Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setDescription(client.starray.registerDesc.replace("{{topic}}", `${topic}`))
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))

    message.channel.send(created)
    let w = await c.send(welcome)
    await w.pin();

    const embed = new client.Discord.MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setTitle("New registration")
      .setColor(client.config.colour)
      .setDescription(`\`${topic}\`\n` + client.starray.registerNext + `\n` + client.starray.closeNext)
      .addField("Username", topic, true)
      .addField("Channel", c, true)
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
      .setTimestamp();
    client.channels.cache.get(client.config.logChannel).send({
      embed
    });
    client.log.info(`${topic} created a new registration (#sealing-stone-${id})`)
  })
  // command ends here
}