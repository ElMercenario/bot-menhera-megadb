const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'sad',
    description: 'I\'m sad and low, yeah\nI\'m sad and low, yeah',
    usage: 'sad',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    disable: true,
    execute: async (message, args) => {

        new Promise(async (resolve, reject) => {
            let gif = await tnai.sfw.sad();
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} Todo bien amigo? D:`)
                .setImage(gif)
                .setColor("RANDOM");
            message.channel.send(embed);
            resolve(gif)
        })
    }
}