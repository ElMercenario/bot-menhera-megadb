const Discord = require('discord.js')
module.exports = {
    name: 'avatar',
    description: 'Muestra tu avatar o de quien menciones',
    usage: 'avatar',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args) => {
        let mencion = message.mentions.users.first() || message.author

        const avatar = new Discord.MessageEmbed()
            .setTitle(`Avatar de ${mencion.tag}`)
            .setDescription(`[Link](${mencion.displayAvatarURL({ size: 1024, dynamic: true })})`)
            .setImage(mencion.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor('RANDOM')
        message.channel.send(avatar)
        return 'si'
    }
}
