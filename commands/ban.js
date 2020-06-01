// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")

module.exports.run = async(client, message, errorEmbed) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission('MANAGE_ROLES')); // Primeiramente ele verifica se você tem as permissões de usar este comando.

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

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.

    var member = message.mentions.members.first().id
    if(!member)member = args[0]
    if(member.hasPermission('MANAGE_GUILD'))return message.channel.send(errorEmbed(`O usuário que você quer banir faz parte da moderação, não posso fazer isso.`))
    var msg = args.slice(1).join(" ")
    var motivo = msg.substr(msg.indexOf(" ") + 1);

    database.ref(`Blacklist/${member}`)
    .once('value').then(async function(snap){ // Definimos que agora vamos pegar o valor do módulo.
    
        database.ref(`Blacklist/${member}`)
        .set({
            reason: motivo
        })

        let embed = new Discord.MessageEmbed() // Cria um Embed
        .setAuthor("Banimento", message.author.avatarURL) // Define o título
        .setDescription(`Usuário punido: <@${member}>\nBanido por: ${message.author}\nMotivo: ${motivo}`) // Calcula o tempo necessário para editar a mensagem
        .setTimestamp() // Define o horário da mensagem
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé
        .setColor(0xf8d75d) // E a cor lateral

        message.channel.send({embed}) // Envia o Embed
    })

}

module.exports.help = {
    name: "ban",
    description: "Comando para banir um usuário de usar o bot."
}