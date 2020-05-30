const Discord = require("discord.js");
const client = new Discord.Client();
const configBot = require("./configBot.json");
const firebase = require("firebase")

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

client.on("message", async message => {
  if(message.author.bot) return;

  if(message.content.indexOf(configBot.prefix) !== 0) return;

  let sender = message.author;
  const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var embedColor = "0x000"

    if(message.author.bot) return;
    if(!command) return;
    let cmd = message.content.split(" ")[0];
    cmd = cmd.slice(configBot.prefix.length);
    try{
    let exec = require('./commands/' + cmd + '.js');
    exec.run(client, message, args, firebase, sender, embedColor);
    }catch(erro) { console.log(erro) }

  })
client.login(process.env.TOKEN)