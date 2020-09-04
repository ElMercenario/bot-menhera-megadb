const render = require('../../modules/images/rank'),
    db = require('megadb'),
    fs = require('fs');
module.exports = {
    name: 'xp',
    description: 'Muestra tu xp actual o de otro usuario',
    usage: 'xp (mencion)',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
    disable: true,
    cooldown: 30,
    execute: async (message, args, prefix, client) => {
        message.channel.startTyping()
        let user = message.mentions.users.first() || message.author
        if (user.id == client.user.id) return message.channel.send('Esa soy yo!\nTengo un nivel I N F I N I T O (⌐■_■)')
        if (!fs.existsSync(`././mega_databases/usuarios/${user.id}.json`)) return message.channel.send('Hmmm no tengo datos de ese usuario')
        let config = new db.crearDB(user.id, 'usuarios')
        let level = await config.obtener('xp.nivel')
        let curXp = await config.get('xp.actual')
        let needXP = await config.get('xp.necesario')
        let color = await config.get('xp.color')
        let url = await config.get('xp.url')
        try {
            let img = await render.run(user, color, level, curXp, needXP, url)
            message.channel.send({ files: [img] })
            message.channel.stopTyping()
        } catch (err) {
            message.channel.send(err)
            message.channel.stopTyping()
        }
    }
}   