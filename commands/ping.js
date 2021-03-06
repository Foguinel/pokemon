// Chamando as bibliotecas.
const Discord = require("discord.js");
const configBot = require("../configBot.json");

module.exports.run = async(client, message) => { // Chama as outras dependências

if(message.author.id !== "449940691045318656" || !message.member.hasPermission('MANAGE_ROLES')) return; // Primeiramente ele verifica se você tem as permissões de usar este comando.
const m = await message.channel.send("Ping?"); // Ele envia uma mensagem como referências

let embed = new Discord.MessageEmbed() // Cria um Embed
.setAuthor("Conexão 📶", message.author.avatarURL) // Define o título
.addField("A latência é de", `${m.createdTimestamp - message.createdTimestamp}ms`) // Calcula o tempo necessário para editar a mensagem
.setTimestamp() // Define o horário da mensagem
.setFooter(`${client.user.username}`, client.user.avatarURL) // Define o rodapé
.setColor(0xf8d75d) // E a cor lateral

m.edit({embed}); // Edita a mensagem de referência
}

module.exports.help = {
    name: "ping",
    description: "Comando para verificar a latência da API."
}