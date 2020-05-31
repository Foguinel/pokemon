const Discord = require("discord.js");
const client = new Discord.Client();
const configBot = require("./configBot.json");
const firebase = require("firebase")

    var firebaseConfig = {
    apiKey: process.env.KEY,
    authDomain: "pokemon-8b7e6.firebaseapp.com",
    databaseURL: "https://pokemon-8b7e6.firebaseio.com",
    projectId: "pokemon-8b7e6",
    storageBucket: "pokemon-8b7e6.appspot.com",
    messagingSenderId: "473412334342",
    appId: "1:473412334342:web:d2179ce2cd42cb8153e487",
    measurementId: "G-4FDY12NK8W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database()

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

  // Firebase

    // global.pokeball = '';
    // global.greatball = '';
    // global.ultraball = '';
    // global.masterball = '';

    global.id = '';
    global.selected = '';
    global.money = '';
    global.inventory = '';
    global.pokedex = '';

    var memberoa = message.mentions.members.first()
    if(!memberoa) memberoa = message.author

    database.ref(`Users/${memberoa.id}`)
	.once('value').then(async function(snap){

    if(message.author.bot) return;
    if(!command) return;
    let cmd = message.content.split(" ")[0];
    cmd = cmd.slice(configBot.prefix.length);
    try{
    let exec = require('./commands/' + cmd + '.js');
    exec.run(client, message, args, firebase, sender, embedColor, snap, database);
    }catch(erro) { console.log(erro) }

  })})
client.login(process.env.TOKEN)