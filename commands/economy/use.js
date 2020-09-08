const db = require('megadb')
const fetch = require('node-fetch');
const Discord = require('discord.js')
module.exports = {
    name: 'use',
    description: 'usa un objeto de tu inventario',
    usage: 'use < item >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        const itemToUse = args.join(' ')
        if (!itemToUse) return message.channel.send('Debes poner un item para usar!')
        const config = new db.crearDB(message.author.id, 'usuarios')
        let usuBag = await config.get('inventory.bag')
        let indexItemBag = usuBag.findIndex(index => index.item == itemToUse)
        if (indexItemBag == -1) return message.channel.send('No tienes ese objeto en tu mochila')
        if (usuBag[indexItemBag].cantidad <= 1) {
            config.delIndex('inventory.bag', indexItemBag)
        } else {
            config.setIndex('inventory.bag', indexItemBag, { item: usuBag[indexItemBag].item, cantidad: usuBag[indexItemBag].cantidad - 1 })
        }
        let gif = await fetch(`https://api.tenor.com/v1/search?q=anime-${itemToUse.replace(/ /g, '-')}&key=IQ1KGGTERBX6&limit=50`)
            .then(res => res.json())
            .then(json => json.results[(Math.floor(Math.random() * 50))].media[0].gif.url)
        const embedGif = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${message.author.tag} usó ${itemToUse}`)
            .setImage(gif)
        message.channel.send(embedGif)
    }
}