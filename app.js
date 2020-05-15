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