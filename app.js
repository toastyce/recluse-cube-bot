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
const Twitter = require('twit');
const fs = require("fs");
const webhook = require("webhook-discord")
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require("./res/config.json");
const twitterConf = require("./res/twitconfig.json")
const fish = require("./res/fish.json");
const starray = require("./res/strings.json");
//const twitterClient = new Twitter(twitterConf);
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.log = log;
client.Discord = Discord;
//client.Twitter = twitterClient;
client.version = version;
client.description = description;
client.starray = starray;
client.fish = fish;
client.msghook = webhook;
//const stream = twitterClient.stream('statuses/filter', {
//  follow: '2899773086', // @Every3Minutes, specify whichever Twitter ID you want to follow
//});

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

client.login(client.config.token);