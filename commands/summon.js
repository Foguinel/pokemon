const Discord = require("discord.js");
module.exports.run = async(client, message, embedColor) => {

    const fetchPokemon = () => {
                const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
                const pokemonId = Math.floor(Math.random() * 807) + 1;
                const url = baseUrl + `${pokemonId}`
                const image = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`

                fetch(url)
                .then(response => response.json())
                .then(pokemon => {
                    message.channel.send(`${pokemon['name']}\n${image}`)
                })
            }
    fetchPokemon()
}

module.exports.help = {
    name: "summon",
    description: "Comando para invocar pokemons."
}