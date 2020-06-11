// Chamando as bibliotecas.
const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const configBot = require("../configBot.json")
const index = require("../index.js")

module.exports.run = async(client, message, errorEmbed) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission('MANAGE_ROLES')); // Primeiramente ele verifica se você tem as permissões de usar este comando.

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g); // Define o que são os argumentos.
    message.channel.send(`${index.getAtk("pikachu")}`)

}

module.exports.help = {
    name: "testing",
    description: "Comando para testar coisas."
}