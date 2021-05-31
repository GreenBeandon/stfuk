require("dotenv").config();
const Discord = require("discord.js");
const Canvas = require('canvas');
const say = require('say')
const client = new Discord.Client();
const prefix = "!stfuk"
var connection;
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({
        status: "dnd",  //You can show online, idle....
        activity: {
            name: "Kintwinn 24/7",  //The message shown
            type: "WATCHING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
});
client.on('guildMemberSpeaking', async (member, speaking) => {

  if(member.user !== undefined){
    if(member.user.id === process.env.KINT){
      if(speaking){
        var rand = Math.floor(Math.random() * 10000);
        console.log(rand);
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
  if(msg.content === "testsay" && process.env.DEBUG){
    say.speak('hello');
  }
  if(msg.content === "testpfp" && process.env.DEBUG){
    const img = await CreatePFP(msg.author);
    console.log(img);
    msg.reply("pfp test", img);
    //client.user.setAvatar(img.attachment);
  }

});
async function UpdateXPFP(user){
  const img = await CreatePFP(user);
  try{
    await client.user.setAvatar(img.attachment);
  }
  catch{
    user.send("You're changing your goddamn profile picture too often for the discord overlords to allow me to change mine. Please get a grip")
    console.log("test");
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
