require('dotenv').config();
const { Client } = require('discord.js'); //Discord

const Comm = require('./commands');
//const Wat  = require('./WastonAPI')

//ENSURE GLOBAL VARS
//console.log(process.env.DISCORDJS_BOT_TOKEN);
console.log(process.env.CLIENT_ID);

//CLIENT
const client = new Client();

var bot = new Comm.Main(client);
bot.On();
bot.Com1();

client.login(process.env.DISCORDJS_BOT_TOKEN);