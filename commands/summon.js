const Discord = require("discord.js"); // Chama o módulo do Discord
module.exports.run = async(client, message, embedColor) => { // Chama as outras dependências

    const fetchPokemon = () => { // Cria um void
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/' // Define a base de URL
        const pokemonId = Math.floor(Math.random() * 807) + 1; // Cria um valor randômico entre 1 à 807
        const image = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png` // Pega uma imagem em melhor resolução
        const url = baseUrl + `${pokemonId}` // Atualiza a URL

        fetch(url) // Pesquisa a URL 
        .then(response => response.json()) // Ele transforma informações dadas pela API em um JSON
        .then(pokemon => { // Com base no JSON ele extrai informações sobre o pokemon
        
        var name = pokemon['name'] // Compacta linhas de código.

        let embed = new Discord.MessageEmbed() // Cria um Embed.
        .setAuthor(`${name}`, image) // Define o título.
        .addField("O id é", `${pokemon['id']}`) // Calcula o tempo necessário para editar a mensagem.
        .setTimestamp() // Define o horário da mensagem.
        .setImage(image) // Define a imagem principal.
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé.
        .setColor(embedColor) // E a cor lateral.

        message.channel.send({embed}) // Envia o Embed.
        })
    }
    fetchPokemon() // Por fim, ele chama o void
}

module.exports.help = {
    name: "summon",
    description: "Comando para invocar pokemons."
}