const db = require('megadb')
const fs = require('fs')
const Discord = require('discord.js')
module.exports = {
    name: 'profile',
    description: 'Muestra tu perfil',
    usage: 'profile <@usuario>',
    aliases: ['perfil'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    
    execute: async (message, args) => {
        let usu = message.mentions.users.first() || message.author 
        if(!fs.existsSync(`././mega_databases/usuarios/${usu.id}.json`)) return message.channel.send('No tengo datos de ese usuario')
        const config = new db.crearDB(usu.id, 'usuarios')
        let efectivo = await config.obtener('money.efectivo')
        let banco = await config.obtener('money.bank')
        let xpActual = await config.obtener('xp.actual')
        let xpNesesario = await config.obtener('xp.necesario')
        let xpNivel = await config.obtener('xp.nivel')
        let invBag = await config.obtener('inventory.bag')
        let invShopOpen = await config.obtener('inventory.shop.open')
        let invShopVen = await config.obtener('inventory.shop.ventas')
        let invShop = await config.obtener('inventory.shop.productos')
        if (!invBag.length) {
            invBag = 'No hay items'
        } else {
            invBag = invBag.map(item => {
                return `${item.item} (x${item.cantidad})`
            }).join(', ')
        }
        if(!invShop.length){
            invShop = 'No hay items'
        }else {
            invShop = invShop.map(item=>{
                return `${item.item} ${item.price}\$`
            }).join('\n')
        }
        const embedProfile = new Discord.MessageEmbed()
            .setThumbnail(usu.displayAvatarURL({ size: 1024 }))
            .setColor('RANDOM')
            .setTitle(`Perfil de ${usu.username}`)
            .addField('💰 Dinero: ', `Efectivo: ${efectivo}\nBanco: ${banco}`, true)
            .addField(`✨ XP:`, `Nivel actual: ${xpNivel}\nXp actual: ${xpActual} / ${xpNesesario}`, true)
            .addField('🎒 Inventario: ', `\`\`\`${invBag}\`\`\``)
            .addField('🏪 Shop: ', `**Open:** ${invShopOpen}\n**Ultimo usuario al que vendiste:** ${invShopVen.usuario}\n**Ultimo producto vendido:** ${invShopVen.producto}`, true)
            .addField('💸 Productos en venta:', `\`\`\`${invShop}\`\`\``)
        message.channel.send(embedProfile)
    }
}