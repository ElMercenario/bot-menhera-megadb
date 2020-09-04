const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'shop',
    description: 'Compra, vende y revisa la tienda de otros jugadores',
    usage: 'shop < buy / shell / show >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        const accion = args[0]
        if (!accion) return message.channel.send('Debes especificar una accion para realizar asi \`buy\` \`shell\` \`show\`')
        switch (accion) {
            case 'buy':
                message.channel.send('En proceso....')
                break;
            case 'shell':
                let itemToShell = args[1]
                if (!itemToShell) return message.channel.send('Debes especificar el item que quieres vender')
                const config = new db.crearDB(message.author.id, 'usuarios')
                let bagDB = await config.get('inventory.bag')
                let bag = bagDB.findIndex(item => item.item == itemToShell)
                if (bag == undefined || bag == -1) return message.channel.send('hmm al parecer no tienes ese objeto en tu mochila')
                let precioProducto = args[2]
                if (!precioProducto) return message.channel.send('Debes especificar un precio')
                let usuShop = await config.get('inventory.shop.productos')
                if(usuShop.length >= 10) return message.channel.send('Ya alcanzaste el maximo de productos en venta (x10)')
                
                let cantidad = await config.get('inventory.bag').then(itemsEnMochila => {
                    let toOk = itemsEnMochila.map(item => {
                        if (item.item == itemToShell) {
                            return item
                        }
                    })
                    return toOk.filter(Boolean)[0]
                })
                if (cantidad.cantidad <= 1) {
                    config.delIndex('inventory.bag', bag)
                } else {
                    config.setIndex('inventory.bag', bag, { item: itemToShell, cantidad: parseInt(cantidad.cantidad) - 1 })
                }
                config.push('inventory.shop.productos', { item: itemToShell, price: precioProducto }).then(tiendaActualizada => {
                    let todoOK = tiendaActualizada.map(itemActializado => {
                        return `\`\`\`\nProducto: ${itemActializado.item}\nPrecio: ${itemActializado.price}\n\`\`\``
                    }).join(' ')
                    const embedTiendaActualizada = new Discord.MessageEmbed()
                        .setDescription(`Ok esta es tu tienda actualizada\n${todoOK}`)
                        .setColor('RANDOM')
                    message.channel.send(embedTiendaActualizada)
                })
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