const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'kiss',
    description: 'Dale besos uwu',
    usage: 'kiss <@usuario>',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args, prefix, client) => {

        new Promise(async (resolve, reject) => {
            let usu = message.mentions.users.first()
            if(!usu){
                message.channel.send('Debes mencionar un usuario para besar')
                return
            }
            let gif = await tnai.sfw.kiss();
            const embed = new Discord.MessageEmbed()
                .setImage(gif)
                .setColor("RANDOM");
            if(usu.id == client.user.id){
                if(message.author.id == '355824156127920148'){
                    embed.setTitle('UwU')
                    message.channel.send(embed)
                    return
                }
                message.channel.send('Lo siento pero ya estoy comprometida con otro u.u')
                return
            }
            if(usu.id == message.author.id){
                message.channel.send('No te puedes besar a ti mismo')
                return
            }
            embed.setTitle(`${message.author.username} Besa a ${usu.username}`)
            message.channel.send(embed);
            resolve(gif)
        })
    }
}