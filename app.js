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

 const leeks = require('leeks.js'); //all log functions imported from external api
 const log = require(`leekslazylogger`);
 const { version, description, } = require('./package.json');

const Discord = require("Discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.log = log;
client.Discord = Discord;
client.version = version;
client.description = description;


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    log.basic(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

console.log(client.log.colour.yellow(leeks.styles.bold(`${client.description} - v${client.version}`)));
log.init('Leeks Logger started successfully!')
log.info(`Starting up...`)

process.on('beforeExit', (code) => {
  log.basic(client.log.colour.yellowBright(`Disconected from Discord API`));
  log.basic(`Exiting (${code})`);
});

client.login(client.config.token);