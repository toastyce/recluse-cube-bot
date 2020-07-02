module.exports = (client, member) => {
  const welcomeMessage = new client.Discord.MessageEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setTitle("Welcome!")
    .setColor(client.config.colour)
    .setDescription(client.starray.welcomeMessage.replace("{{user}}", `@${member.id}`))
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    .setTimestamp();

  const embed = new client.Discord.MessageEmbed()
    .setAuthor(`<${client.user.username}>`, client.user.avatarURL)
    .setTitle("New member")
    .setColor(client.config.colour)
    .setDescription(`<@${member.id}>` + ":\n A New user has joined the server.")
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
    .setTimestamp();

    let topic = `<@${member.id}>`;
    let id = message.author.id.toString().substr(0, 4) + message.author.discriminator;

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

  member.roles.add(client.config.juniorRole).catch(console.error);
  member.guild.channels.cache.get(client.config.guestChannel).send(`<@${member.id}>`).then(
    member.guild.channels.cache.get(client.config.guestChannel).send(welcomeMessage).catch(client.log.error).then(
      member.guild.channels.cache.get(client.config.logChannel).send(embed).catch(client.log.error)));

  client.log.info(`${member.displayName} has joined.`)
};