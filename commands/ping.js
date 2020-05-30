const Discord = require("discord.js");
module.exports.run = async(client, message, embedColor) => {

if(message.author.id !== "449940691045318656" || !message.member.hasPermission(['MANAGE_GUILDS']));
const m = await message.channel.send("Ping?");
let embed = new Discord.MessageEmbed()
.setAuthor("Conexão 📶", message.author.avatarURL)
.addField("A latência é de", `${m.createdTimestamp - message.createdTimestamp}ms`)
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
.setColor(embedColor)

m.edit({embed});
}

module.exports.help = {
    name: "ping",
    description: "Comando para verificar a latência da API."
}