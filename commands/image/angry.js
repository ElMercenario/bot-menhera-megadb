const gif = require('tnai');
const tnai = new gif();
const Discord = require('discord.js');

module.exports = {
    name: 'angry',
    description: 'Cuando estas enojado',
    usage: 'angry',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args) => {
        new Promise(async (resolve, reject) => {
            let gif = await tnai.sfw.angry();
            console.log(gif);
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} esta enajado >:(`)
                .setImage(gif)
                .setColor("RANDOM");
            message.channel.send(embed);
            resolve(gif)
        });
    }
}

