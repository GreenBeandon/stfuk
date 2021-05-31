require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!stfuk"
var connection;
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});
client.on('guildMemberSpeaking', async (member, speaking) => {

  if(member.user !== undefined){
    if(member.user.id === process.env.KINT){
      if(speaking){
        var rand = Math.floor(Math.random() * 1000);
        console.log(rand);
        if(rand === 999){
          member.voice.setMute(true);
        }
      }

    }
  }

});
client.on('voiceStateUpdate', async (oldState, newState) => {
    // check for bot
    if (oldState.member.user.bot) return;
    if(oldState.speaking !== newState.speaking) {

      // User started speaking
   }
    if(newState.member.user.id === process.env.KINT){

      if(newState.channelID !== null){
        connection = await newState.member.voice.channel.join();
      }
      else{
        connection.disconnect();
      }
    }
    // the rest of your code
    console.log(newState.channelID);

})

client.on("message", async  msg => {

  if(msg.author.id === process.env.KINT){
    var rand = Math.floor(Math.random() * 1000);
    if(rand === 999){
      msg.reply("shut the fuck up");
    }

  }

  if(msg.content.startsWith(prefix)){
    msg.reply("shut the fuck up");
  }

});

client.login(process.env.BOT_TOKEN)
