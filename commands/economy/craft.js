const index = require('./index.json')
const db = require('megadb')
module.exports = {
    name: 'craft',
    description: 'Crea items para venderlos',
    usage: 'craft < item >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        let itemCraft = args.join(' ')
        if (!itemCraft) return message.channel.send('Debes poner un item a craftear, inventate uno!\nLos numeros cuentan como multiplicador')
        if (!isNaN(parseInt(itemCraft))) return message.channel.send(`ok pero... ${parseInt(itemCraft)} que?`)
        if (itemCraft.length > 30) return message.channel.send('No puedes crear un item mayor a 30 caracteres')

        let multiplicador = /\d/gmiu
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
                        const config = new db.crearDB(message.author.id, 'usuarios')
                        let authorBag = await config.get('inventory.bag')
                        let materialGastar = []
                        authorBag.map(item => {
                            materiales.map(material => {
                                if (item.item == material) {
                                    let number = materiales.indexOf(material)
                                    materialGastar.push(materiales.splice(number, 1))
                                }
                            })
                        })
                        if (materiales.length) return message.channel.send(`No tienes los materiales en tu mocila \nMateriales que te faltan: \`${materiales.join(', ')}\``)
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
                            config.push('inventory.bag', {item: itemCraft, cantidad: 1})
                        } else {
                            config.setIndex('inventory.bag', indexBag, {item: itemCraft, cantidad: authorBag[indexBag].cantidad + 1})
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
            message.channel.send('Hmm no entiendo que objeto mistico quieres craftear asi que solo te voy a cobrar')
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
    }
]