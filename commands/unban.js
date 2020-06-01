// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")

module.exports.run = async(client, message, errorEmbed) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission('MANAGE_ROLES')); // Primeiramente ele verifica se você tem as permissões de usar este comando.

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.

    var usuario = message.mentions.members.first()
    if(usuario.hasPermission('MANAGE_GUILD'))return message.channel.send(errorEmbed(`O usuário que você quer banir faz parte da moderação, não posso fazer isso.`))
    var msg = args.slice(1).join(" ")
    var motivo = msg.substr(msg.indexOf(" ") + 1);

    database.ref(`Blacklist/${usuario.id}`)
    .once('value').then(async function(snap){ // Definimos que agora vamos pegar o valor do módulo.
    
        database.ref(`Blacklist/${usuario.id}`)
        .set({
            
        })

        let embed = new Discord.MessageEmbed() // Cria um Embed
        .setAuthor("Desbanimento", message.author.avatarURL) // Define o título
        .setDescription(`Usuário desbanido: <@${member}>\nDesbanido por: ${message.author}\nMotivo: ${motivo}`) // Calcula o tempo necessário para editar a mensagem
        .setTimestamp() // Define o horário da mensagem
        .setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé
        .setColor(0xf8d75d) // E a cor lateral

        message.channel.send({embed}) // Envia o Embed
    })

}

module.exports.help = {
    name: "unban",
    description: "Comando para desbanir um usuário de usar o bot."
}