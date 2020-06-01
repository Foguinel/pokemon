// O index.js é utilizado para iniciar nosso projeto. Primeiramente, chamarei as bibliotecas necessárias.
const Discord = require("discord.js");
const client = new Discord.Client();
const configBot = require("./configBot.json");
const firebase = require("firebase");
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Logo após isso, fazemos a configuração inicial do banco de dados.
var firebaseConfig = {
    apiKey: process.env.KEY,
    authDomain: "pokemon-8b7e6.firebaseapp.com",
    databaseURL: "https://pokemon-8b7e6.firebaseio.com",
    projectId: "pokemon-8b7e6",
    storageBucket: "pokemon-8b7e6.appspot.com",
    messagingSenderId: "473412334342",
    appId: "1:473412334342:web:d2179ce2cd42cb8153e487",
    measurementId: "G-4FDY12NK8W"
};
  
firebase.initializeApp(firebaseConfig); // Conectamos o banco de dados ao projeto
const database = firebase.database(); // Chamamos o conteúdo do banco de dados.

// Essa parte é responsável por manter o bot 24/7.
express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Iniciado na porta ${PORT}`))

    client.on("message", async message => {
        if(message.content.indexOf(configBot.prefix) !== 0 || message.author.bot) return; // Pedimos para que ele ignore mensagens de bots e que ele só responda caso comece com o prefixo.

        const args = message.content.slice(configBot.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase(); // Define o que é um coando
        var embedColor = "0xf8d75d" // Define a cor padrão dos Embeds
        
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

        // Banco de Dados

            // Agora vamos definir as informações básicas dos usuários como o pokémon que está usando, seu inventário etc.
            global.id = '';
            global.selected = '';
            global.money = '';
            global.inventory = '';

            database.ref(`Users/${message.author.id}`) // Definimos que estamos trabalhando no módulo do usuário que mandou a mensagem.

            let cmd = message.content.split(" ")[0]; // Ele primeiramente captara o comando dado pelo usuário.
            cmd = cmd.slice(configBot.prefix.length); // Irá retirar o prefixo.
            try{
            let exec = require('./commands/' + cmd + '.js'); // Irá procurar o comando.
            exec.run(client, message, args, embedColor, database, errorEmbed); // Ele irá enviar as dependências para os outros arquivos.
            }catch(erro){
                if(!cmd)return; // Ele irá ignorar caso o comando dado pelo usuário não exista.
                console.log(erro) // Em caso de outros erros, o bot avisará no console.
            }
    })

client.login(process.env.TOKEN) // Por fim, ligamos o bot.