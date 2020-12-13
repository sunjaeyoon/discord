// All Module Imports For Watson Conversation API
require('dotenv').config();
const Discord = require("discord.js");
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

//GLOBAL VARS
const ASSISTANT_ID= process.env.ASSISTANT_ID; //from UI
const ASSISTANT_URL=process.env.WATSON_URL; //service-credentials-blog
const ASSISTANT_APIKEY=process.env.WATSON_API_key; //service-credentials-blog
const ASST_API_VERSION = '2020-12-12';
const Token = process.env.DISCORDJS_BOT_TOKEN;

var text = "HOLD UP! I am not ready yet"; //PLACEHOLDER
var sess;

//Initiate Assistant
const assistant = new AssistantV2({
  version: ASST_API_VERSION,
  authenticator: new IamAuthenticator({
    apikey: ASSISTANT_APIKEY,
  }),
  serviceUrl: ASSISTANT_URL,
});

//Call Assistant
async function getMessage(request, sessionId, msg) {
  assistant.message(
    {
      input: { text: request },
      assistantId: ASSISTANT_ID,
      sessionId: sessionId
    })
    .then(response => {
      //console.log("successful call");
      //console.log(JSON.stringify(response.result, null, 2)); //an entire response from the service
      text = JSON.stringify(response.result.output.generic[0].text, null, 2); //pass the value to the global variable
      msg.reply(text) 
      return JSON.stringify(response.result.output.generic[0].text, null, 2);
    })
    .catch(err => {
      console.log("unsuccessful call");
      console.log(err);
      msg.reply("Sorry, I was offline please try again")
      sess = null;
    });
}

//Create Session for getMessage()
async function callWatson(request, msg){
  //Get Session Number to pass into next function
  if (!sess){
    sess = (await assistant.createSession({assistantId: ASSISTANT_ID})
      .then(res => {
        //console.log(res.result.session_id)
        return res.result.session_id
      })
      .catch(err => {
        console.log(err);
      })
    );
    console.log(sess)  
  }

  var response = (await getMessage(request, sess, msg));
  return response
}

//Set Up Discord 
const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
  //regexp for a key word 'blu*'
    if (msg.author.bot){return}
    else if (msg.content == "ping"){
      msg.reply('pong');
    }else{
      //console.log(msg.content)
      callWatson(msg.content, msg)
      //console.log(text)
    }
});

client.login(Token);