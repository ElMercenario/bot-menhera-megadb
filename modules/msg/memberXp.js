const db = require('megadb')
const render = require('../images/rank')
module.exports = {
    run: async (message) => {
        if (message.author.bot) return
        setTimeout(async () => {
            let config = new db.crearDB(message.author.id, 'usuarios')
            let currentXP = await config.get('xp.actual')
            let needXP = await config.get('xp.necesario')
            currentXP = await config.add('xp.actual', (Math.round(Math.random() * message.content.length)))
            if (needXP < currentXP) {
                let xpRestante = currentXP - needXP
                config.add('xp.nivel', 1)
                config.set('xp.actual', xpRestante)
                config.set('xp.necesario', (Math.floor((needXP * 3) / 2)))

                let level = await config.get('xp.nivel')
                needXP = await config.get('xp.necesario')
                let curXp = await config.get('xp.actual')
                let color = await config.get('xp.color')
                let url = await config.get('xp.url')
                message.channel.startTyping()
                let img = await render.run(message.author, color, level, curXp, needXP, url).catch(err => console.log(err.toString()))
                message.reply(`Haz subido de nivel`, { files: [img] }).then(m => m.delete({ timeout: 10000 }))
                message.channel.stopTyping()
            }
        }, 50)
    }
}