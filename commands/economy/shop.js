const fs = require('fs')
const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'shop',
    description: 'Compra, vende y revisa la tienda de otros jugadores',
    usage: 'shop < buy / shell / show / cancel / open / close / info >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args, prefix, client) => {
        const accion = args[0]
        if (!accion) return message.channel.send('Debes especificar una accion para realizar asi \`buy\` \`shell\` \`show\` \`cancel\` \`open\` \`close\` \`info\`')
        switch (accion) {
            case 'buy':
                const buyUsuMencion = message.mentions.users.first()
                if (!buyUsuMencion) return message.channel.send('Debes mencionar a un usuario para comprarle')
                if (buyUsuMencion.id == message.author.id) return message.channel.send('No te puedes comparte a ti mismo')
                if (buyUsuMencion.id == client.user.id) return message.channel.send('No tengo tiempo para abrir una tienda')
                if (!fs.existsSync(`././mega_databases/usuarios/${buyUsuMencion.id}.json`)) return message.channel.send('Hmm no tengo datos de ese usuario')
                const buyDbMencion = new db.crearDB(buyUsuMencion.id, 'usuarios')
                if (!await buyDbMencion.get('inventory.shop.open')) return message.channel.send(`${buyUsuMencion} tiene la tienda cerrada vuelve mas tarde o pidele que la abra`)
                let buyProductoAComprar = args[2]
                if (!buyProductoAComprar) return message.channel.send('Debes escribir un producto para comprar')
                let buyIndexShop = await buyDbMencion.get('inventory.shop.productos').then(shop => {
                    let asd = shop.findIndex(item => item.item == buyProductoAComprar)
                    return asd
                })
                if (buyIndexShop == -1) return message.channel.send('El usuario no tiene ese producto')
                let buyProducto = await buyDbMencion.get('inventory.shop.productos').then(itemShop => {
                    let asd = itemShop.map(item => {
                        if (item.item == buyProductoAComprar) return item
                    })
                    return asd.filter(Boolean)[0]
                })
                const buyDbAuthor = new db.crearDB(message.author.id, 'usuarios')
                let buyMoneyAuthor = await buyDbAuthor.get('money.efectivo')
                if (buyProducto.price > buyMoneyAuthor) return message.channel.send('No tienes el dinero en efectivo suficiente para comprar ese producto')
                buyDbAuthor.restar('money.efectivo', buyProducto.price)
                let buyIndexBagAuthor = await buyDbAuthor.get('inventory.bag').then(bag => {
                    let ok = bag.findIndex(item => item.item == buyProductoAComprar)
                    return ok
                })
                let buyBagItemAuthor = await buyDbAuthor.get('inventory.bag').then(bag => {
                    let ok = bag.map(item => {
                        if (item.item == buyProductoAComprar) return item
                    })
                    return ok.filter(Boolean)[0]
                })
                if (buyIndexBagAuthor == -1) {
                    buyDbAuthor.push('inventory.bag', { item: buyProductoAComprar, cantidad: 1 })
                } else {
                    buyDbAuthor.setIndex('inventory.bag', buyIndexBagAuthor, { item: buyBagItemAuthor.item, cantidad: buyBagItemAuthor.cantidad + 1 })
                }
                buyDbMencion.delIndex('inventory.shop.productos', buyIndexShop)
                buyDbMencion.set('inventory.shop.ventas.usuario', `${message.author.tag}(${message.author.id})`)
                buyDbMencion.set('inventory.shop.ventas.producto', buyProductoAComprar)
                buyDbMencion.set('inventory.shop.ventas.fecha', `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)
                buyDbAuthor.set('inventory.shop.compras.producto', buyProductoAComprar)
                buyDbAuthor.set('inventory.shop.compras.usuario', `${buyUsuMencion.tag}(${buyUsuMencion.id})`)
                buyDbAuthor.set('inventory.shop.compras.fecha', `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)
                message.channel.send(`Compraste ${buyProductoAComprar} por un precio de ${buyProducto.price}\$`)
                break;
            case 'shell':
                let shellItemToShell = args[1]
                if (!shellItemToShell) return message.channel.send('Debes especificar el item que quieres vender')
                const shellConfig = new db.crearDB(message.author.id, 'usuarios')
                let shellIndexBag = await shellConfig.get('inventory.bag').then(obtenido => {
                    let asd = obtenido.findIndex(item => item.item == shellItemToShell)
                    return asd
                })
                console.log(shellIndexBag);
                if (shellIndexBag == undefined || shellIndexBag == -1) return message.channel.send('Hmm al parecer no tienes ese objeto en tu mochila')
                if (!args[2]) return message.channel.send('Debes ponerle un precio al producto')
                let shellPrecioProducto = parseInt(args[2])
                if (isNaN(shellPrecioProducto)) return message.channel.send('El precio que especificaste es incorrecto')
                if (shellPrecioProducto > 1000) return message.channel.send('El precio no puede ser mayor a 1000')
                if (!shellPrecioProducto) return message.channel.send('Debes especificar un precio')
                let shellUsuShop = await shellConfig.get('inventory.shop.productos')
                if (shellUsuShop.length >= 10) return message.channel.send('Ya alcanzaste el maximo de productos en venta (x10)')

                let shellBagUsu = await shellConfig.get('inventory.bag').then(itemsEnMochila => {
                    let toOk = itemsEnMochila.map(item => {
                        if (item.item == shellItemToShell) {
                            return item
                        }
                    })
                    return toOk.filter(Boolean)[0]
                })
                if (shellBagUsu.cantidad <= 1) {
                    shellConfig.delIndex('inventory.bag', shellIndexBag)
                } else {
                    shellConfig.setIndex('inventory.bag', shellIndexBag, { item: shellItemToShell, cantidad: parseInt(shellBagUsu.cantidad) - 1 })
                }
                shellConfig.push('inventory.shop.productos', { item: shellItemToShell, price: shellPrecioProducto }).then(tiendaActualizada => {
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
                const embedShopShow = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                let usuMencion = message.mentions.users.first() || message.author
                if (usuMencion.bot) return message.channel.send('Los bots no pueden tener una tienda :(')
                const dbUsu = new db.crearDB(usuMencion.id, 'usuarios')
                let usuMencionShop = await dbUsu.get('inventory.shop.productos')
                if (!usuMencionShop.length) {
                    embedShopShow.setTitle(`Tienda de ${usuMencion.tag}`)
                    embedShopShow.setDescription(`El usuario ${usuMencion} no tiene ningun objeto a la venta`)
                    message.channel.send(embedShopShow)
                    return
                }
                embedShopShow.setTitle(`Tienda de ${usuMencion.tag}`)
                embedShopShow.setDescription(usuMencionShop.map(item => {
                    return `\`\`\`Producto: ${item.item}\nPrecio: ${item.price}\`\`\``
                }).join(' '))
                message.channel.send(embedShopShow)
                break;
            case 'cancel':
                let cancelProducto = args[1]
                if (!cancelProducto) return message.channel.send('Debes escribir un producto para quitar de la venta')
                const cancelDbAuthor = new db.crearDB(message.author.id, 'usuarios')
                let cancelIndexShop = await cancelDbAuthor.get('inventory.shop.productos').then(producto => {
                    let ok = producto.findIndex(item => item.item == cancelProducto)
                    return ok
                })
                if (cancelIndexShop == -1) {
                    return message.channel.send('No tienes ese producto a la venta')
                } else {
                    let cancelIndexBag = await cancelDbAuthor.get('inventory.bag').then(producto => {
                        let ok = producto.findIndex(item => item.item == cancelProducto)
                        return ok
                    })
                    if (cancelIndexBag == -1) {
                        cancelDbAuthor.push('inventory.bag', { item: cancelProducto, cantidad: 1 })
                        cancelDbAuthor.delIndex('inventory.shop.productos', cancelIndexShop)
                    } else {
                        let cancelBagAuthor = await cancelDbAuthor.get('inventory.bag')
                        cancelBagAuthor = cancelBagAuthor[cancelIndexBag]
                        cancelDbAuthor.setIndex('inventory.bag', cancelIndexBag, { item: cancelBagAuthor.item, cantidad: cancelBagAuthor.cantidad + 1 })
                        cancelDbAuthor.delIndex('inventory.shop.productos', cancelIndexShop)
                    }
                    message.channel.send(`El producto ${cancelProducto} se ha retirado corectamente`)
                }
                break
            case 'open':
                const openDbAuthor = new db.crearDB(message.author.id, 'usuarios')
                let openShopOpen = await openDbAuthor.get('inventory.shop.open')
                if (openShopOpen) {
                    message.channel.send('Tu tienda ya esta abierta')
                } else {
                    openDbAuthor.set('inventory.shop.open', true)
                    message.reply('Abriste tu tienda!')
                }
                break;
            case 'close':
                const closeDbAuthor = new db.crearDB(message.author.id, 'usuarios')
                let closeShopOpen = await closeDbAuthor.get('inventory.shop.open')
                if (closeShopOpen) {
                    closeDbAuthor.set('inventory.shop.open', false)
                    message.reply('Cerraste tu tienda!')
                } else {
                    message.channel.send('Tu tienda ya esta cerrada')
                }
                break;
            case 'info':
                let infoUsu = message.mentions.users.first() || message.author
                if(!fs.existsSync(`././mega_databases/usuarios/${infoUsu.id}.json`)) return message.channel.send('No tengo datos de ese usuario')
                const infoDbUsu = new db.crearDB(infoUsu.id, 'usuarios')
                let infoVentasUsu = await infoDbUsu.get('inventory.shop.ventas.usuario')
                let infoVentasProducto = await infoDbUsu.get('inventory.shop.ventas.producto')
                let infoVentasFecha = await infoDbUsu.get('inventory.shop.ventas.fecha')
                if(infoVentasFecha == undefined) infoVentasFecha = 'No hay datos';
                let infoComprasUsu = await infoDbUsu.get('inventory.shop.compras.usuario')
                let infoComprasProducto = await infoDbUsu.get('inventory.shop.compras.producto')
                let infoComprasFecha = await infoDbUsu.get('inventory.shop.compras.fecha')
                const infoEmbed = new Discord.MessageEmbed()
                    .setTitle(`Informacion hacerca de las transacciones de ${infoUsu.tag}`)
                    .addField(`**Ventas**`, `*Ultimo usuario registrado:*\n👤 ${infoVentasUsu}\n*Ultimo producto registrado:*\n🏷 ${infoVentasProducto}\n*Ultima fecha registrada:*\n📆 ${infoVentasFecha}`, true)
                    .addField(`**Compras**`, `*Ultimo usuario registrado:*\n👤 ${infoComprasUsu}\n*Ultimo producto registrado:*\n🏷 ${infoComprasProducto}\n*Ultima fecha registrada:*\n📆 ${infoComprasFecha}`, true)
                    .setColor('RANDOM')
                    .setFooter(`Consultado por: ${message.author.tag}`, message.author.displayAvatarURL())
                message.channel.send(infoEmbed)
                break;
            default:
                message.channel.send('Esa accion no existe\nDebes especificar una accion para realizar asi \`buy\` \`shell\` \`show\` \`cancel\` \`open\` \`close\` \`info\`')
                break;
        }
    }
}