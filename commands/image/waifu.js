const Discord = require('discord.js')
const { waifus } = require('./index.json')
module.exports = {
    name: 'waifu',
    description: 'Te doy una waifu aleatoria',
    usage: 'waifu',
    aliases: ['w'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    cooldown: 5,
    execute: async (message, args) => {
        let random = Math.round(Math.random() * waifus.length)
        const embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> aqui esta tu waifu**`)
            .setColor('RANDOM')
            .setImage(waifus[random])
            .setFooter(`waifu: ${random}`)
        message.channel.send(embed)
    }
}
