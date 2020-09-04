const Discord = require('discord.js')
const { Canvas } = require("swiftcord")
const regx = require("hex-color-regex")
module.exports = {
    name: 'hex',
    description: 'Dame un color en formato hex y le lo devuelvo en una imagen',
    usage: 'hex <#color>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        var color = args[0]
        if (!color) return message.channel.send('Debes poner un color en codigo hexadecimal')
        if (color.indexOf('#') == 0) {
            color = color.substr(1, color.length - 1)
        }
        if (!regx({ strict: true }).test(`#${color}`)) return message.channel.send('No es un color')
        const sc = new Canvas()
        let img = await sc.color(`#${color}`)
        let imagen = new Discord.MessageAttachment(img, `hex_${color}.png`)

        const embed = new Discord.MessageEmbed()
            .setTitle(`Color #${color}`)
            .attachFiles([imagen])
            .setImage(`attachment://hex_${color}.png`)
            .setColor(`#${color}`)
        message.channel.send(embed)
    }
}