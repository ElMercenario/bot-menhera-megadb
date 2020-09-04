const Discord = require('discord.js')
const { Canvas } = require("swiftcord")
module.exports = {
    name: 'batslap',
    description: 'Recibe una baticachetada',
    usage: 'batslap',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        let user = message.mentions.users.first()
        if(!user){
            message.channel.send('Menciona a alguien para darle una baticachetada')
            return
        }
        const canva = new Canvas()
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024});
        let image = await canva.batslap(message.author.displayAvatarURL({ dynamic: false, format: 'png', size: 1024}), avatar);
        let attachment = new Discord.MessageAttachment(image, "batslap.png");
        return message.channel.send(attachment);
    }
}