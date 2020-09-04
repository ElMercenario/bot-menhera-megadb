const Discord  = require('discord.js')
module.exports = {
    name: '8ball',
    description: 'Preguntame cualquier cosa y yo te responeré con un si o no',
    usage: '8ball <pregunta>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        if(!args.length) return message.channel.send('Debes poner uan pregunta')
        let siono = Math.round(Math.random() * 1)
        if(siono == 1) siono = 'si'
        if(siono == 0) siono = 'no'
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Tu pregunta: ', args.join(' '))
            .addField('Mi respuesta: ', siono)
            .setFooter(`Convocado por ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(embed)
    }
}