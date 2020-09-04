const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'happy',
    description: 'Because I\'m happy\nClap along if you feel like happiness is the truth🎼',
    usage: 'happy',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args) => {

        new Promise(async (resolve, reject) => {
            let gif = await tnai.sfw.happy();
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} esta feliz :D`)
                .setImage(gif)
                .setColor("RANDOM");
            message.channel.send(embed);
            resolve(gif)
        })
    }
}