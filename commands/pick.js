// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")

module.exports.run = async(client, message, embedColor, errorEmbed) => { // Chama as outras dependências.

    import embedColor from '../index.js'
    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.

    function errorEmbed(s){
        //Definimos os erros mais comuns como números para facilitar a troca.
        if(s == 1)s = `Para utilizar os comandos, é necessário escolher seu primeiro pokémon(${configBot.prefix}pick).`

        let embed = new Discord.MessageEmbed() // Cria um Embed.
        .setAuthor(`Oopps!`, message.author.avatarURL) // Define o título.
        .setDescription(`${s}`) // Define a descrição
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé.
        .setColor(0xf63152) // E a cor lateral.

        return({embed}) // Retorna o Embed.
        }

    function caps(s){
        if(!s)return;
        s = s.toLowerCase()
        str = s.charAt(0).toUpperCase()
        return str + s.substring(1);
    } // Função que faz a primeira letra ficar em CAPSLOCK.

    database.ref(`Users/${message.author.id}`) // Definimos que estamos trabalhando no módulo do usuário que mandou a mensagem.
    .once('value').then(async function(snap){ // Definimos que agora vamos pegar o valor do módulo.

    if(snap.val() !== null)return message.channel.send(errorEmbed(`Parece que você já iniciou sua jornada.`));
    var input = args[1]; // Define input como a primeira palavra dita pelo usuário.
    let pokes = ["bulbasauro", "charmander", "squirtle", "chikorita", "cyndaquil", "totodile", "treecko", "torchic", "mudkip", "turtwig", "chimchar", "piplup", "snivy", "tepig", "oshawott", "chespin", "fennekin", "froakie", "rowlet", "litten", "popplio"] // Um array no qual define os pokémons iniciais.
    if(!input)return message.channel.send("Bulbasauro   Charmander\nSquirtle   Chikorita\nCyndaquil   Totodile\nTreecko   Torchic\nMudkip   Turtwig\nChimchar   Piplup\nSnivy   Tepig\nOshawott   Chespin\nFennekin   Froakie\nRowlet   Litten\nPopplio") // Caso não contenha nada além do comando, ele listará os pokémons que podem ser escolhidos.
    var input = input.toLowerCase(); // Transforma o input em minúsculo.

    let ids = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728] // IDs dos pokémons iniciais.
    var pokeId = ids[pokes.indexOf(input)]; // Faz o texto se transformar no ID do pokémon.

        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/' // Define a base de URL.
        const url = baseUrl + `${args[1]}` // Atualiza a URL.
        const image = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png` // Pega uma imagem em melhor resolução.

        fetch(url) // Pesquisa a URL.
        .then(response => response.json()) // Ele transforma informações dadas pela API em um JSON.
        .then(pokemon => { // Com base no JSON ele extrai informações sobre o pokemon.
    
    if(pokes.includes(input)){ // Caso o input dado pelo usuário seja um pokémon inicial, ele continuará.

        let embed = new Discord.MessageEmbed() // Cria um Embed.
        .setAuthor(`${pokemon['name']}`, image) // Define o título.
        .setDescription(`Você escolheu ${pokemon['name']} como seu pokémon inicial.`)
        .setImage(image) // Define a imagem principal.
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé.
        .setColor(embedColor) // E a cor lateral.

        message.channel.send({embed}) // Envia o pokémon escolhido junto de uma imagem.

        database.ref(`Users/${message.author.id}`) // Definimos que estamos trabalhando no módulo do usuário que mandou a mensagem.
        .set({
            id: "lorem",
            selected: input,
            money: "lorem",
            inventory: "lorem",
        }) // Define os valores das informações básicas.
        .then(
        database.ref(`Users/${message.author.id}/pokedex/${input}`) // Definimos que estamos trabalhando no módulo do pokémon que o usuário que enviou a mensagem escolheu.
        .set({
            id: "lorem",
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
        }) // Define os valores das informações básicas.
        )
    }
    })
}
    )}

module.exports.help = {
    name: "pick",
    description: "Comando para pegar seu primeiro pokemon."
}