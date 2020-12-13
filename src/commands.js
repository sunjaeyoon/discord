require('dotenv').config();
const Discord = require("discord.js");

class Main {
    constructor(bot) {
        this.client = bot;
      }
    On(){
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
          });
    }
    Com1() {
        this.client.on("message", (msg) => {
            if (msg.author.bot){return}
            console.log(msg.content)
            let words = msg.content.toLowerCase().split(" ");

            switch (words[0]) {
                case `hello`:
                    msg.channel.send(`Hello! ${msg.author} I'm SKYNET I'm new to human world and still observing every action for some amazing stuff I will controll everything in Year 3000 see you in future`);
                    setTimeout(() => {
                        msg.channel.send("Hope You're Having A Great Day ; )");
                    }, 2000);
                    break;
                case `who`:
                    msg.channel.send("Cyber Expert is a good person and a happy software developer as well. He likes people with some differnent kind of personalities");
                    break;
            }
        });



    }

}

module.exports = {
    Main
};