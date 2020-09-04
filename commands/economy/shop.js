const db = require('megadb')
module.exports = {
    name: 'shop',
    description: 'Compra, vende y revisa la tienda de otros jugadores',
    usage: 'shop < buy / shell / show >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        const arg1 = args[0]
        if (!arg1) return message.channel.send('Debes especificar una accion para realizar asi \`buy\` \`shell\` \`show\`')
        switch (arg1) {
            case 'buy':
                message.channel.send('En proceso....')
                break;
            case 'shell':
                let itemToShell = args[1]
                if (!itemToShell) return message.channel.send('Debes especificar el item que quieres vender')
                const config = new db.crearDB(message.author.id, 'usuarios')
                let bagDB = await config.get('inventory.bag')
                let bag = bagDB.find(item => item.item == itemToShell)
                if (!bag) return message.channel.send('hmm al parecer no tienes ese objeto en tu mochila')
                message.channel.send(bag)
                break;
            case 'show':
                message.channel.send('En proceso....')
                break;
            default:
                message.channel.send('Esa accion no existe\nDebes especificar una accion para realizar asi \`buy\` \`shell\` \`show\`')
                break;
        }
    }
}