const db = require('megadb')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'rob',
    description: 'robale a un usuario ',
    usage: 'rob <@usuario>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    cooldown: 7200,
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args, prefix, client) => {
        let usuRobado = message.mentions.users.first()
        if (!usuRobado) return message.channel.send('Debes mencionar a un usuario para robar')
        if (usuRobado.id == message.author.id) return message.channel.send('No puedes robarte a ti mismo')
        if (usuRobado.id == client.user.id) return message.channel.send('No puedes robarme a mi >:(')
        if (!fs.existsSync(`././mega_databases/usuarios/${usuRobado.id}.json`)) return message.channel.send('hmm no tengo registros de ese usuario')
        const dbUsuRobado = new db.crearDB(usuRobado.id, 'usuarios')
        const dbUsuLadron = new db.crearDB(message.author.id, 'usuarios')
        let dineroParaRobar = await dbUsuRobado.get('money.efectivo')
        if (dineroParaRobar < 50) {
            message.channel.send('No puedes robarle a alguien que tenga menos de 50$ en efectivo')
            return
        }
        let dineroRobado = Math.round(Math.random() * (Math.round(dineroParaRobar / 4)))
        usuRobado.send(`**Te han robado!**\nEl usuario \`${message.author.tag}\` te a robado \`${dineroRobado}\$\`, ahora tienes \`${await dbUsuRobado.restar('money.efectivo', dineroRobado)}\$\`.`)
            .catch(err => err)
        message.channel.send(`le robaste al usuario ${usuRobado}, ahora tienes ${await dbUsuLadron.sumar('money.efectivo', dineroRobado)}\$`)
    }
}