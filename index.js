require("dotenv").config();
require("./extensions")
const Discord = require("discord.js");
const Canvas = require('canvas');
const dev = require("./developerCommands");
const say = require('say')
const client = new Discord.Client();
const prefix = "!stfuk"
var debug = process.env.DEBUG === "true";
var today = undefined;
var sentToday = false;



var connection;
client.on("ready", () => {
  dev.log(`Logged in as ${client.user.tag}!`)
  if(debug){
    client.user.setPresence({
          status: "dnd",  //You can show online, idle....
          activity: {
              name: "DEVELOPER MODE",  //The message shown
              type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
          }
      });
  }
  else{
    client.user.setPresence({
          status: "dnd",  //You can show online, idle....
          activity: {
              name: "Kintwinn 24/7",  //The message shown
              type: "WATCHING" //PLAYING: WATCHING: LISTENING: STREAMING:
          }
      });
  }

});
client.on('guildMemberSpeaking', async (member, speaking) => {

  if(member.user !== undefined){
    if(member.user.id === process.env.KINT){
      if(speaking){
        var rand = Math.floor(Math.random() * 10000);
        dev.log(rand);
        if(rand === 9999){
          member.voice.setMute(true);
        }
      }

    }
  }

});
client.on('voiceStateUpdate', async (oldState, newState) => {
    // check for bot
    if (oldState.member.user.bot) return;

    if(newState.member.user.id === process.env.KINT){
      if(newState.channelID !== null){
        connection = await newState.member.voice.channel.join();
        var u = client.users.cache.find(i => i.id === process.env.KINT);
        await UpdateXPFP(u);
      }
      else{
        connection.disconnect();
      }
    }
    // the rest of your code
    dev.log(newState.channelID);

})

client.on("message", async  msg => {

  if(msg.author.id === process.env.BEAN){
    MockKint()
  }


  if(msg.author.id === process.env.KINT){
    var rand = Math.floor(Math.random() * 1000);
    if(rand === 999){
      msg.reply("shut the fuck up");
    }

  }

  if(msg.content.startsWith(prefix)){
    msg.reply("shut the fuck up");
  }
  if(msg.content === "testsay" && debug){
    say.speak('hello');
  }
  if(msg.content === "testpfp" && debug){
    const img = await CreatePFP(msg.author);
    dev.log(img);
    msg.reply("pfp test", img);
    //client.user.setAvatar(img.attachment);
  }

});

async function MockKint(){
  var date = (new Date());//.addDays(6);
  var dateString = date.toDateString();
  if(today !== dateString){
    today = dateString;
    sentToday = false;

    var day = today.split(' ')[0];
    dev.log(day);
    let channel = client.channels.cache.get(process.env.GENCHAT)
    switch(day.toLowerCase()){
      case "sun":
        dev.log("Today is Sunday");
        channel.send("<@" + process.env.KINT + "> its lazy Rei Sunday!", {
          files: ["./images/lazyreisunday.png"]
        });
        break;
      case "mon":
        dev.log("Today is Mon");
        channel.send("<@" + process.env.KINT + ">", {
          files: ["./images/misatomonday.png"]
        });
        break;
      case "tue":
        dev.log("Today is Tuesday");
        channel.send("<@" + process.env.KINT + ">", {
          files: ["./images/reituesday.jpg"]
        });
        break;
      case "wed":
        dev.log("Today is Wednesday");
        channel.send("<@" + process.env.KINT + ">", {
          files: ["./images/wedthurs.png"]
        });
        break;
      case "thu":
        dev.log("Today is Thursday");
        channel.send("<@" + process.env.KINT + ">", {
          files: ["./images/asukathursday.gif"]
        });
        break;
      case "fri":
        dev.log("Today is Friday");
        channel.send("<@" + process.env.KINT + ">", {
          files: ["./images/aloneonafridaynight.png"]
        });
        break;
      case "sat":
        dev.log("Today is Saturday");
        channel.send("<@" + process.env.KINT + ">", {
          files: ["./images/aloneonasaturdaynight.png"]
        });
        break;

        sentToday = true;

    }

  }



}


async function UpdateXPFP(user){
  const img = await CreatePFP(user);
  try{
    await client.user.setAvatar(img.attachment);
  }
  catch{
    user.send("You're changing your goddamn profile picture too often for the discord overlords to allow me to change mine. Please get a grip")
    dev.log("test");
  }
}
async function CreatePFP(user){


  const canvas = Canvas.createCanvas(125, 125);
	const context = canvas.getContext('2d');

  const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
  const x = await Canvas.loadImage('./images/x.png');
  context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
  context.drawImage(x, 0, 0, canvas.width, canvas.height);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'newpfp.png');

  return attachment
}
client.login(process.env.BOT_TOKEN)
