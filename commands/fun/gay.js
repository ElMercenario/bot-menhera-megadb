const Discord = require('discord.js'),
    { Canvas } = require("swiftcord")
module.exports = {
    name: 'gay',
    description: 'Jsjs gei',
    usage: 'gay',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        let user = message.mentions.users.first() || message.author
        const canva = new Canvas()
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'jpg', size: 1024 });
        let image = await canva.gay(avatar);
        let attachment = new Discord.MessageAttachment(image, `${user.username}esgay.jpg`);
        return message.channel.send(attachment);
    }
}