// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")

module.exports.run = async(client, message, errorEmbed) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission(['MANAGE_ROLES'])); // Primeiramente ele verifica se você tem as permissões de usar este comando.

    database.ref(`Blacklist`)

}

module.exports.help = {
    name: "ban",
    description: "Comando para banir um usuário de usar o bot."
}