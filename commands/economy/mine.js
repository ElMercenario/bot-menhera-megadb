const { minerales } = require('./index.json'),
    db = require('megadb'),
    Discord = require('discord.js');

module.exports = {
    name: 'mine',
    description: 'Mina para ganar minerales',
    usage: 'mine',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,
    cooldown: 1800,

    execute: async (message, args) => {
        let config = new db.crearDB(message.author.id, 'usuarios');
        var random = Math.round(Math.random() * (11 - 1) + 1)
        var minRandom = Math.round(Math.random() * minerales.length)
        if (args.length) return

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Haz ganado')
        await config.obtener('inventory.bag').then(async y => {
            let index = y.findIndex(u => u.item == minerales[minRandom])
            var si
            y.map(n => {
                if (n.item == minerales[minRandom]) {
                    return si = n.cantidad
                } else {
                    return
                }
            })

            if (index != -1) {
                config.setIndex('inventory.bag', index, { item: `${minerales[minRandom]}`, cantidad: parseInt(si) + parseInt(random) }).then(async () => {
                    await config.obtener('money.efectivo').then(p => {
                        let money = Math.round(Math.random() * (21 - 5) + 5)
                        config.set('money.efectivo', parseInt(p) + parseInt(money))
                        embed.setDescription(`• **Minerales**: ${minerales[minRandom]} (x${random})\n• **Coins**: ${money}`)
                        message.channel.send(embed)
                    })

                }).catch(err => {
                    message.channel.send('Ocurrio un error intentalo mas tarde')
                    console.log(err)
                })
            } else {
                config.push('inventory.bag', { item: minerales[minRandom], cantidad: random })
                await config.obtener('money.efectivo').then(p => {
                    let money = Math.round(Math.random() * (21 - 5) + 5)
                    config.set('money.efectivo', parseInt(p) + parseInt(money))
                    embed.setDescription(`• **Minerales** ${minerales[minRandom]} (x${random})\n• **Coins** ${money}`)
                    message.channel.send(embed)
                })
            }
        }).catch(err => {
            message.channel.send('Ocurrio un error intentalo mas tarde')
            console.log(err)
        })


    }
}
