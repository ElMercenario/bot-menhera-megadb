const clientN = require("nekos.life"),
    Discord = require('discord.js'),
    neko = new clientN();
module.exports = {
    name: 'wallpaper',
    description: 'Te doy un wallpaer para otakus sin vida social',
    usage: 'wallpaper',
    aliases: ['wall'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        neko.sfw.wallpaper().then(nekoo => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<@${message.author.id}> Aqui tienes tu wallpaper`)
                .setImage(nekoo.url);
            return message.channel.send(embed);
        })
    }
}