const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'Da un abrazo',
    usage: 'hug <@usuario>',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args, prefix, client) => {

        new Promise(async (resolve, reject) => {
            let usu = message.mentions.users.first()
            if(!usu){
                message.channel.send('Debes mencionar un usuario para abrazar')
                return
            }
            let gif = await tnai.sfw.hug();
            const embed = new Discord.MessageEmbed()
                .setImage(gif)
                .setColor("RANDOM");
            if(usu.id == client.user.id){
                embed.setTitle(`* acepta el abrazo *`)
                message.channel.send(embed)
                return
            }
            if(usu.id == message.author.id){
                embed.setTitle(`${message.author.username} Quiere amor u.u`)
                message.channel.send(embed)
                return
            }
            embed.setTitle(`${message.author.username} Esta abrazando a ${usu.username}`)
            message.channel.send(embed);
            resolve(gif)
        })
    }
}