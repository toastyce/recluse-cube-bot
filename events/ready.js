module.exports = (client, message) => {
  client.log.info(`Initializing Recluse Cube...`)
  client.log.success(`Connected to Discord API`)
  client.log.success(`Logged in as ${client.user.tag}`)
  client.user.setPresence({
    game: {
      name: client.config.playing,
      type: client.config.activityType
    },
    status: client.config.status
  })
    .catch(client.log.error);

  const embed = new client.Discord.MessageEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setColor("#2ECC71")
    .setDescription(":white_check_mark: **Started succesfully**")
    .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));

  client.channels.cache.get(client.config.logChannel).send(embed);
  if (client.guilds.cache.get(client.config.guildID).member(client.user).hasPermission("ADMINISTRATOR", false)) {
    client.log.info(`Checking permissions...`);
    setTimeout(function () {
      client.log.success(`Required permissions have been granted\n\n`)
    }, 1250);

    const embed = new client.Discord.MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setColor("#2ECC71")
      .setDescription(":white_check_mark: **Required permissions have been granted**")
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));

    client.channels.cache.get(client.config.logChannel).send(embed)
  } else {
    client.log.error(`Required permissions have not been granted`)
    client.log.error(`Please give the bot the 'ADMINISTRATOR' permission\n\n`)

    const embed = new client.Discord.MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setColor("#E74C3C")
      .setDescription(":x: **Required permissions have not been granted**\nPlease give the bot the `ADMINISTRATOR` permission")
      .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`));

    client.channels.cache.get(client.config.logChannel).send({
      embed
    })
  }
};