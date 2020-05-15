/**
###############################################################################################
Recluse Cube
===============================================================================================
> Set config.json
  @name recluse-cube-bot
  @author Freya <Freya#2000>
  @license GNU-GPLv3
###############################################################################################
*/
const fs = require('fs');
const Discord = require('discord.js');
const leeks = require('leeks.js'); //all log functions imported from external api
const log = require(`leekslazylogger`);
const config = require('./config.json');//ID values MUST be PRESENT and UPDATED!!!
const { version, description, } = require('./package.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const now = Date.now();
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //input list of commands based on names of files within commands subfolder

client.once('ready', () => {
    log.info(`Initializing Recluse Cube...`)
    for (const file of commands) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.name, command);
      log.console(`> Loading '${config.prefix}${command.name}' command`);
    }
    log.success(`Connected to Discord API`)
    log.success(`Logged in as ${client.user.tag}`)
    client.user.setPresence({ game: { name: config.playing, type: config.activityType }, status: config.status })
    .catch(log.error);
  
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setColor("#2ECC71")
      .setDescription(":white_check_mark: **Started succesfully**")
      .setFooter(`${description} - v${version}`);
    client.channels.cache.get(config.logChannel).send(embed);
    if (client.guilds.cache.get(config.guildID).member(client.user).hasPermission("ADMINISTRATOR", false)) {
      log.info(`Checking permissions...`);
      setTimeout(function () {
        log.success(`Required permissions have been granted\n\n`)
      }, 1250);
  
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setColor("#2ECC71")
        .setDescription(":white_check_mark: **Required permissions have been granted**")
        .setFooter(`${description} - v${version}`);
      client.channels.cache.get(config.logChannel).send(embed)
    } else {
      log.error(`Required permissions have not been granted`)
      log.error(`Please give the bot the 'ADMINISTRATOR' permission\n\n`)
  
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setColor("#E74C3C")
        .setDescription(":x: **Required permissions have not been granted**\nPlease give the bot the `ADMINISTRATOR` permission")
        .setFooter(`${description} - v${version}`);
      client.channels.cache.get(config.logChannel).send({
        embed
      })
    }
  });



client.login(config.token);