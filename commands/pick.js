const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database()
const configBot = require("../configBot.json")

module.exports.run = async(client, message, embedColor) => {

    function caps(s){
        if(!s)return;
        s = s.toLowerCase()
        str = s.charAt(0).toUpperCase()
        return str + s.substring(1);
    }

    database.ref(`Users/${message.author.id}`)
    .once('value').then(async function(snap){
    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g);

    if(snap.val() !== null)return message.channel.send("Você já pegou seu primeiro pokemon.");
    var input = args[1]
    let pokes = ["bulbasauro", "charmander", "squirtle", "chikorita", "cyndaquil", "totodile", "treecko", "torchic", "mudkip", "turtwig", "chimchar", "piplup", "snivy", "tepig", "oshawott", "chespin", "fennekin", "froakie", "rowlet", "litten", "popplio"]
    if(!input)return message.channel.send("Bulbasauro", "Charmander", "Squirtle", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic", "Mudkip", "Turtwig", "Chimchar", "Piplup", "Snivy", "Tepig", "Oshawott", "Chespin", "Fennekin", "Froakie", "Rowlet", "Litten", "Popplio")
    var input = input.toLowerCase()

    let ids = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728]
    var pokeId = ids[pokes.indexOf(input)];

        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
        const pokemonId = Math.floor(Math.random() * 807) + 1;
        const url = baseUrl + `${args[1]}`
        const image = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`

        fetch(url)
        .then(response => response.json())
        .then(pokemon => {
    
    if(pokes.includes(input)){
        message.channel.send("Você escolheu ``" + caps(input) + "`` como seu pokémon inicial.\n" + image)

        database.ref(`Users/${message.author.id}`)
        .set({
            id: "lorem",
            selected: input,
            money: "lorem",
            inventory: "lorem",
        })
        .then(
        database.ref(`Users/${message.author.id}/pokedex/${input}`)
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