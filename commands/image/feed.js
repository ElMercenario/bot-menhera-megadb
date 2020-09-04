const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'feed',
    description: 'Alimenta a alguien',
    usage: 'feed <@usuario>',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args, prefix, client) => {

        new Promise(async (resolve, reject) => {
            let usu = message.mentions.users.first()
            if(!usu){
                message.channel.send('Debes mencionar un usuario para alimentar')
                return
            }
            let gif = await tnai.sfw.feed();
            const embed = new Discord.MessageEmbed()
                .setImage(gif)
                .setColor("RANDOM");
            if(usu.id == client.user.id){
                embed.setTitle(`${message.author.username} Me alimenta uwu`)
                message.channel.send(embed)
                return
            }
            if(usu.id == message.author.id){
                embed.setTitle(`${message.author.username} Se alimenta`)
                message.channel.send(embed)
                return
            }
            embed.setTitle(`${message.author.username} Alimenta a ${usu.username}`)
            message.channel.send(embed);
            resolve(gif)
        })
    }
}