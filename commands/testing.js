// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")

module.exports.run = async(client, message, errorEmbed) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission('MANAGE_ROLES')); // Primeiramente ele verifica se você tem as permissões de usar este comando.

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.

    const fetchPokemon = () => { // Cria um void.
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'; // Define a base de URL.
        var pokemonId = args[1]; // Define pokemonId como a primeira palavra dita pelo usuário.
        if(!args[1])var pokemonId = Math.floor(Math.random() * 807) + 1; // Define pokemonId como um valor randômico entre 1 à 807.
        const url = baseUrl + `${pokemonId}`; // Atualiza a URL.

        fetch(url) // Pesquisa a URL.
        .then(response => response.json()) // Ele transforma informações dadas pela API em um JSON.
        .then(pokemon => { // Com base no JSON ele extrai informações sobre o pokemon.
        
        var name = pokemon['name']; // Compacta linhas de código.
        var id = pokemon['id']; // Compacta linhas de código.
        const image = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`; // Pega uma imagem em melhor resolução
        
        var moves = pokemon['moves']

        var keys = [];
        for(var i = 0;i < Object.keys(moves).length;i++)
        {
            Object.keys(moves[i]).forEach(function(key){
                if(keys.indexOf(key) == -1)
                {
                    keys.push(moves[Math.floor(Math.random() * moves.indexOf - 1) + 1].move.name, moves[Math.floor(Math.random() * moves.indexOf - 1) + 1].move.name, moves[Math.floor(Math.random() * moves.indexOf - 1) + 1].move.name, moves[Math.floor(Math.random() * moves.indexOf - 1) + 1].move.name);
                }
            });
        }


    // database.ref(`Test/Pokémon/${pokemon}`)
    // .once('value').then(async function(snap){ // Definimos que agora vamos pegar o valor do módulo.
    
    //     database.ref(`Test/Pokémon/${pokemon}`)
    //     .set({
            
    //     })

        let embed = new Discord.MessageEmbed() // Cria um Embed
        .setAuthor(`${name}`, message.author.avatarURL) // Define o título
        .setDescription(`- ${atk1}\n- ${atk2}\n- ${atk3}\n- ${atk4}`) // 
        .setTimestamp() // Define o horário da mensagem
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé
        .setColor(0xf8d75d) // E a cor lateral

        message.channel.send({embed}) // Envia o Embed
    })
    // })
}
fetchPokemon() // Por fim, ele chama o void.
}

module.exports.help = {
    name: "unban",
    description: "Comando para desbanir um usuário de usar o bot."
}