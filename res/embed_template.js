const embed = new client.Discord.MessageEmbed()
.setAuthor(`<${client.user.username}>`, client.user.avatarURL)
.setTitle("Titlehere")
.setColor(client.config.colour)
.setDescription("Textfieldhere")
.setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
.setTimestamp();