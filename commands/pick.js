const Discord = require("discord.js");
const firebase = require("firebase");

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

module.exports.run = async(client, message, embedColor, args) => {
    database.ref(`Users/${message.author.id}`)
    .once('value').then(async function(snap){

    if(snap.val() !== null)return message.channel.send("Você já pegou seu primeiro pokemon.");
    var input = args[0].toLowerCase()
    if(!input)return;
    let pokes = ["bulbasauro", "charmander", "squirtle", "chikorita", "cyndaquil", "totodile", "treecko", "torchic", "mudkip", "turtwig", "chimchar", "piplup", "snivy", "tepig", "oshawott", "chespin", "fennekin", "froakie", "rowlet", "litten", "popplio"]
    let ids = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728]
    var pokeId = ids[pokes.indexOf(input)];

        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
        const pokemonId = Math.floor(Math.random() * 807) + 1;
        const url = baseUrl + `${pokeId}`
        const image = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`

        fetch(url)
        .then(response => response.json())
        .then(pokemon => {
    
    if(pokemons.includes(input)){
        message.channel.send("Você escolheu ``" + input.charAt(0).toUpperCase + input.substring(1) + "``\n" + image)

        database.ref(`Users/${message.author.id}`)
        .set({
            id: "lorem",
            selected: input,
            money: "lorem",
            inventory: "lorem",
            pokedex: input
        })
        .then(
        database.ref(`Users/${message.author.id}/${input}`)
        .set({
            lvl: 1,
            hp: "lorem",
            atk: "lorem",
            def: "lorem",
            spatk: "lorem",
            spdef: "lorem",
            spd: "lorem",
            iv: "lorem",
            type: "lorem",
            ability: "lorem",
            nature: "lorem",
            gender: "lorem",
            xp: "lorem",
            friendship: "lorem",
            affection: "lorem",
            held: "lorem"
        })
        )
    }
    })
}
    )}

module.exports.help = {
    name: "pick",
    description: "Comando para pegar seu primeiro pokemon."
}