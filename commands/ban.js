// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")

module.exports.run = async(client, message, errorEmbed) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission(['MANAGE_ROLES'])); // Primeiramente ele verifica se você tem as permissões de usar este comando.

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.

    var member = message.mentions.members.first()
    if(!member && args[0])member = args[0]
    var msg = message.join(" ")
    var motivo = msg.substr(msg.indexOf(" ") + 1);

    database.ref(`Blacklist/${member}`)
    .once('value').then(async function(snap){ // Definimos que agora vamos pegar o valor do módulo.
    
        database.ref(`Blacklist/${member}`)
        .set({
            reason: motivo
        })

    })

}

module.exports.help = {
    name: "ban",
    description: "Comando para banir um usuário de usar o bot."
}