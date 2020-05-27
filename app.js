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
const {
  version,
  description,
} = require('./package.json');

const Discord = require("Discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require("./res/config.json");
const starray = require("./res/strings.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.log = log;
client.Discord = Discord;
client.version = version;
client.description = description;
client.starray = starray;


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

console.log(client.log.colour.yellow(leeks.styles.bold(client.starray.footer.replace("{{version}}", `${client.version}`))));
log.init('Leeks Logger started successfully!')
log.info(`Starting up...`)

process.on('beforeExit', (code) => {
  log.basic(client.log.colour.yellowBright(`Disconected from Discord API`));
  log.basic(`Exiting (${code})`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  const chan = reaction.message.embeds[0].fields[0].value
  client.log.debug(`channel ID:${chan}`)
  const ch = client.channels.cache.get(chan);
  if (!ch.permissionOverwrites.get(user.id)) {
    ch.createOverwrite([{
      id: user.id,
      allow: ['VIEW_CHANNEL'],
      allow: ['SEND_MESSAGES']
    }])
  } else {
    ch.overwritePermissions([{
      id: user.id,
      allow: ['VIEW_CHANNEL'],
      allow: ['SEND_MESSAGES']
    }])
  }
  console.log(reaction.message.embeds[0].fields[0].value)
  if (reaction.partial) await reaction.fetch();
  console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  const chan = reaction.message.embeds[0].fields[0].value
  client.log.debug(`channel ID:${chan}`)
  const ch = client.channels.cache.get(chan);
  if (!ch.permissionOverwrites.get(user.id)) {
    ch.createOverwrite([{
      id: user.id,
      deny: ['VIEW_CHANNEL'],
      deny: ['SEND_MESSAGES']
    }])
  } else {
    ch.overwritePermissions([{
      id: user.id,
      deny: ['VIEW_CHANNEL'],
      deny: ['SEND_MESSAGES']
    }])
  }
  console.log(reaction.message.embeds[0].fields[0].value)
  if (reaction.partial) await reaction.fetch();
  console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

client.login(client.config.token);