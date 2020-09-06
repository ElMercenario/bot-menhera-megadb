const db = require('megadb')
module.exports = {
    name: 'withdraw',
    description: 'Saca dinero de tu banco',
    usage: 'withdraw < [cantidad] / all >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        if(!args[0]) return message.channel.send('Debes colocar un numero o all')
        const config = new db.crearDB(message.author.id, 'usuarios')
        let moneyBanco = await config.get('money.bank')
        if(moneyBanco == 0) return message.channel.send('No tienes dinero en el banco')
        if(args[0] == 'all'){
            config.set('money.bank', 0)
            config.sumar('money.efectivo', moneyBanco)
            message.channel.send(`Sacaste ${moneyBanco}\$ de tu banco`)
            return
        }
        let moneySacar = parseInt(args[0])
        if(isNaN(moneySacar)) return message.channel.send('Debes colocar un numero')
        if(moneyBanco < moneySacar) return message.channel.send('No tienes ese dinero en el banco')
        config.restar('money.bank', moneySacar)
        config.sumar('money.efectivo', moneySacar)
        message.channel.send(`Sacaste ${moneySacar}\$ de tu banco`)
    }
}