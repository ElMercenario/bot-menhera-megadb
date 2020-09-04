const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'greeting',
    description: 'Saluda a alguien',
    usage: 'greeting <@usuario>',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args, prefix, client) => {

        new Promise(async (resolve, reject) => {
            let usu = message.mentions.users.first()
            if(!usu){
                message.channel.send('Debes mencionar un usuario para saludar')
                return
            }
            let gif = await tnai.sfw.greeting();
            const embed = new Discord.MessageEmbed()
                .setImage(gif)
                .setColor("RANDOM");
            if(usu.id == client.user.id){
                embed.setTitle(`${message.author.username} Hola!`)
                message.channel.send(embed)
                return
            }
            if(usu.id == message.author.id){
                embed.setTitle(`${message.author.username} Te estas auto saludando ._.XD`)
                message.channel.send(embed)
                return
            }
            embed.setTitle(`${usu.username} Dile hola a ${message.author.username}`)
            message.channel.send(embed);
            resolve(gif)
        })
    }
}