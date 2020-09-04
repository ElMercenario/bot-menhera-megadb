const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'cry',
    description: 'T-T',
    usage: 'cry',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args) => {

        new Promise(async (resolve, reject) => {
            let gif = await tnai.sfw.cry();
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} esta llorando T-T`)
                .setImage(gif)
                .setColor("RANDOM");
            message.channel.send(embed);
            resolve(gif)
        })
    }
}