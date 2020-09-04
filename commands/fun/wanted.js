const Discord = require('discord.js')
const { Canvas } = require("swiftcord")
module.exports = {
    name: 'wanted',
    description: 'Es buscado',
    usage: 'wanted',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        let user = message.mentions.users.first() || message.author
        const canva = new Canvas()
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024});
        let image = await canva.wanted(avatar);
        let attachment = new Discord.MessageAttachment(image, "wanted.png");
        return message.channel.send(attachment);
    }
}