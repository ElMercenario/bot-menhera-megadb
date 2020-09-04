const { trabajos } = require('./index.json')
const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'work',
    description: 'Trabaja como un buen ser humano',
    usage: 'work',
    category: __dirname.split('\\').pop(),
    disable: true,
    cooldown: 10,
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    execute: async (message, args) => {
        const config = new db.crearDB(message.author.id, 'usuarios')
        let moneyGanada = Math.round(Math.random() * 20)
        config.sumar('money.efectivo', moneyGanada)
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${trabajos[(Math.floor(Math.random() * trabajos.length))]}, ganaste ${moneyGanada}\$`)
        message.channel.send(embed)
    }
}