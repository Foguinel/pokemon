// Chamando as bibliotecas.
const Discord = require("discord.js");
const configBot = require("../configBot.json")

module.exports.run = async(client, message) => { // Chama as outras dependências.

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.

    const fetchPokemon = () => { // Cria um void.
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'; // Define a base de URL.
        var pokemonId = args[1]; // Define pokemonId como a primeira palavra dita pelo usuário.
        if
        
        
        (!args[1])var pokemonId = Math.floor(Math.random() * 807) + 1; // Define pokemonId como um valor randômico entre 1 à 807.
        const url = baseUrl + `${pokemonId}`; // Atualiza a URL.

        fetch(url) // Pesquisa a URL.
        .then(response => response.json()) // Ele transforma informações dadas pela API em um JSON.
        .then(pokemon => { // Com base no JSON ele extrai informações sobre o pokemon.
        
        var name = pokemon['name']; // Compacta linhas de código.
        var id = pokemon['id']; // Compacta linhas de código.
        const image = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`; // Pega uma imagem em melhor resolução.

        let embed = new Discord.MessageEmbed() // Cria um Embed.
        .setAuthor(`${name}`, image) // Define o título.
        .setImage(image) // Define a imagem principal.
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé.
        .setColor(0xf8d75d) // E a cor lateral.

        message.channel.send({embed}) // Envia o Embed.
        })
    }
    fetchPokemon() // Por fim, ele chama o void.
}

module.exports.help = {
    name: "summon",
    description: "Comando para invocar pokemons."
}