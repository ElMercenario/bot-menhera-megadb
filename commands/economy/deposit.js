const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'deposit',
    description: 'Deposita tu dinero en el banco',
    usage: 'deposit < cantidad / all >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        if(!args.length) return message.channel.send('Debes poner una cantidad a depositar o all para depositar todo')
        const config = new db.crearDB(message.author.id, 'usuarios')
        let efectivo = await config.get('money.efectivo')
        if(efectivo == 0) return message.channel.send('No tienes efectivo para depositar')
        if(args[0] == 'all'){
            let dineroActualizado = await config.sumar('money.bank', efectivo)
            config.set('money.efectivo', 0)
            message.channel.send(`Depositaste todos tus fondos a el banco ahora tienes ${dineroActualizado}\$ en tu banco`)
            return
        }
        'use strict';
        let dineroADepositar = parseInt(args[0])
        if(isNaN(dineroADepositar)) return message.channel.send('Debes colocar un numero')
        if(dineroADepositar > efectivo) return message.channel.send('No tienes fondos suficientes')
        config.restar('money.efectivo', dineroADepositar)
        config.sumar('money.bank', dineroADepositar)
        message.channel.send(`Depositaste ${dineroADepositar}\$ a tu banco`)
    }
}