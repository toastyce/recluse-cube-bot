/**
###############################################################################################
Recluse Cube
===============================================================================================
> Set config.json
  @name recluse-cube-bot
  @author Freya <Freya#2000>
  @license ISC
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

console.log(log.colour.yellow(leeks.styles.bold(`${description} - v${version}`)));
log.init('Leeks Logger started successfully!')
log.info(`Starting up...`)

// Initialization
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

//Listening for messages
client.on('message', message => {
  // message filters
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) return;
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setTitle("Ticket Archive")
      .addField("Username", message.author.tag, true)
      .addField("Message", message.content, true)
      .setFooter(`${description} - v${version}`);
    client.channels.cache.get(config.logChannel).send(embed);
  }
  // matching prefix and formatting command
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${config.prefix})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); //change to comma
  const commandName = args.shift().toLowerCase();
  log.info(`${commandName}`)
  log.info(`${args}`)
});

//Error handling
client.on('error', error => {
  log.warn(`Potential error detected\n(likely Discord API connection issue)\n`);
  log.error(`Client error:\n${error}`);
});
client.on('warn', (e) => log.warn(`${e}`));
if (config.debugLevel == 1) { client.on('debug', (e) => log.debug(`${e}`)) };
process.on('unhandledRejection', error => {
  log.warn(`An error was not caught`);
  log.error(`Uncaught error: \n${error.stack}`);
});
process.on('beforeExit', (code) => {
  log.basic(log.colour.yellowBright(`Disconected from Discord API`));
  log.basic(`Exiting (${code})`);
});

client.login(config.token);