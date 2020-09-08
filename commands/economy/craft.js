'use strict';
const index = require('./index.json')
const db = require('megadb')
module.exports = {
    name: 'craft',
    description: 'Crea items para venderlos',
    usage: 'craft < item >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        let itemCraft = args.join(' ')
        if (!itemCraft) return message.channel.send('Debes poner un item a craftear, inventate uno!')
        if (!args[1]) {
            if (!isNaN(parseInt(args[0]))) return message.channel.send(`ok pero... ${parseInt(itemCraft)} que?`)
        }
        if (itemCraft.length > 30) return message.channel.send('No puedes crear un item mayor a 30 caracteres')

        let materiales = []

        regexp.map(valor => {
            let indicador = args.join('').match(valor.regexp)
            if (indicador) {
                for (let i = 0; i < indicador.length; i++) {
                    materiales.push(valor.material)
                }
            }
        })
        if (MatchMine(args[0]) == undefined) return message.channel.send('Estas tratando de crear un mineral que se debe conseguir minando')
        const config = new db.crearDB(message.author.id, 'usuarios')
        let authorBag = await config.get('inventory.bag')
        if (materiales.length) {
            message.channel.send(`Materiales necesarios \`${materiales.join(', ')}\` \nReacciona a ✅ para craftearlo o ❌ para cancelar`).then(msg => {
                msg.react('✅')
                msg.react('❌')
                const filtro = (reaction, user) => {
                    return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
                }
                msg.awaitReactions(filtro, { max: 1, time: 60000, errors: ['time'] }).catch(() => {
                    msg.edit('La creacion a sido cancelada ya que no se tomo una eleccion')
                }).then(async coleccion => {
                    if (!coleccion) return
                    const emoji = coleccion.first()
                    if (emoji.emoji.name == '✅') {
                        let materialGastar = []
                        authorBag.map(item => {
                            materiales.map(material => {
                                if (item.item == material) {
                                    let number = materiales.indexOf(material)
                                    materialGastar.push(materiales.splice(number, 1))
                                }
                            })
                        })
                        if (materiales.length) return msg.delete(), message.channel.send(`No tienes los materiales en tu mochila \nMateriales que te faltan: \`${materiales.join(', ')}\``)
                        authorBag.map(item => {
                            materialGastar.map(material => {
                                if (item.item == material) {
                                    let mapIndex = authorBag.findIndex(itemBag => itemBag.item == material)
                                    if (item.cantidad <= 1) {
                                        config.delIndex('inventory.bag', mapIndex)
                                    } else {
                                        config.setIndex('inventory.bag', mapIndex, { item: authorBag[mapIndex].item, cantidad: authorBag[mapIndex].cantidad - 1 })
                                    }
                                }
                            })
                        })
                        let indexBag = authorBag.findIndex(itemBag => itemBag.item == itemCraft)
                        if (indexBag == -1) {
                            config.push('inventory.bag', { item: itemCraft, cantidad: 1 })
                        } else {
                            config.setIndex('inventory.bag', indexBag, { item: itemCraft, cantidad: authorBag[indexBag].cantidad + 1 })
                        }
                        msg.delete()
                        message.channel.send(`Haz crafteado ${itemCraft}`)
                    }
                    if (emoji.emoji.name == '❌') {
                        msg.delete()
                        message.channel.send('Ok se cancela el crafteo')
                    }
                })
            })
        } else {
            message.channel.send(`Hmm no entiendo que objeto mistico quieres craftear asi que te voy a cobrar ${itemCraft.length}\$ \nReacciona a ✅ para craftearlo o ❌ para cancelar`).then(msg => {
                msg.react('✅')
                msg.react('❌')
                const filtro = (reaction, user) => {
                    return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
                }
                msg.awaitReactions(filtro, { max: 1, time: 60000, errors: ['time'] }).catch(() => {
                    msg.edit('La creacion a sido cancelada ya que no se tomo una eleccion')
                }).then(async coleccion => {
                    if (!coleccion) return
                    const emoji = coleccion.first()
                    if (emoji.emoji.name == '✅') {
                        let moneyAuthor = await config.get('money.efectivo')
                        if (itemCraft.length > moneyAuthor) return msg.delete(), message.channel.send(`No tienes ${itemCraft.length}\$ en efectivo`)
                        config.restar('money.efectivo', itemCraft.length)
                        let indexBag = authorBag.findIndex(itemBag => itemBag.item == itemCraft)
                        if (indexBag == -1) {
                            config.push('inventory.bag', { item: itemCraft, cantidad: 1 })
                        } else {
                            config.setIndex('inventory.bag', indexBag, { item: itemCraft, cantidad: authorBag[indexBag].cantidad + 1 })
                        }
                        msg.delete()
                        message.channel.send(`Haz crafteado ${itemCraft}`)
                    }
                    if (emoji.emoji.name == '❌') {
                        msg.delete()
                        message.channel.send('Ok se cancela el crafteo')
                    }
                })
            })
        }
    }
}

/**
 * retorna true si encuntra alguna coincidencia 
 * undefined sin no la encuntra
 * @param {String} args string con la palabra a buscar
 */
async function MatchMine(craftitem) {
    let buscar = []
    index.minerales.map(i => buscar.push(i.toLowerCase()))

    if (buscar.find(asd => asd == craftitem.toLowerCase())) {
        return true
    } else {
        return undefined
    }
}

let regexp = [
    {
        material: 'Hierro',
        regexp: /((h+)?(i+|!+)(e+|3+)(r+)?r+(o+|0+))|((i+|!+)r+(o+|0+)(n+)?)|(m+(e+|3+)t+(a+|4+)(l+|I+))/gimu
    },
    {
        material: 'Roca',
        regexp: /(p+(i+|l+)(e+|3+)d+r+(a+|4+))|(r+(o+|0+)c+(a+|4+))|(r+(o+|0+)c+(k+)?)|(s+(t+|7+)(o+|0+)n+(e+|3+)?)/gimu
    },
    {
        material: 'Azure',
        regexp: /((e+|3+)n+c+(a+|4+)n+t+(a+|4+)d+(o+|0+))|((e+|3+)n+c+h+(a+|4+)n+(t+|7+)((e+|3+)d+)?)/gimu
    },
    {
        material: 'Madera',
        regexp: /(p+(a+|4+)(l+|I+)(o+|0+))|(s+(t+|7+)(i+|l+)c+(k+)?)/gimu
    },
    {
        material: 'palo',
        regexp: /((e+|3+)s+p+(a+|4+)d+(a+|4+))|(s+w+(o+|0+)r+(d+)?)/gimu
    },
    {
        material: 'Diamante',
        regexp: /(d+(i+|l+)(a+|4+)m+(a+|4+)n+(t+|7+)(e+|3+))|(d+(i+|l+)(a+|4+)m+(o+|0+)n+d+)|((a+|4+)d+(a+|4+)m+(a+|4+)n+(t+|7+))/gimu
    },
    {
        material: 'Carbon',
        regexp: /(f+(o+|0+)g+(a+|4+)(t+|7+)(a+|4+))|(f+u+(e|3+)g+(o+|0+))|((a+|4+)n+(t+|7+)(o+|0+)r+c+h+(a+|4+))|((w+(o+|0+)d+)?(f+(i+|l+)r+(e+|3+)))|(t+(o+|0+)r+c+h+)/gimu
    },
    {
        material: 'Amatista',
        regexp: /((a+|4+)m+(a+|4+)t+(i+|l+)s+t+(a+|4+))/gimu
    },
    {
        material: 'Perla',
        regexp: /(m+(a+|4+)m+(a+|4+)d+(o+|0+))|(m+(a+|4+)m+(a+|4+)d+(i+|l+)s+(i+|l+)m+(o+|0+))/gimu
    }
]