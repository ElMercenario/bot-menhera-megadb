const db = require('megadb'),
    render = require('../../modules/images/rank'),
    regex = require('hex-color-regex');
module.exports = {
    name: 'xpcard',
    description: 'Configura la imagen de fondo de tu tarjeta de xp y tambien el color (opcional)',
    usage: 'xpcard <link> (color)',
    category: __dirname.split('\\').pop(),
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
    disable: false,
    cooldown: 10,
    execute: async (message, args) => {
        let url = args[0]
        let argsColor = args[1] || '#cd5c5c'
        if (!url) return message.channel.send('Debes poner el link de la imagen que quieres de fondo')
        let user = message.author
        let config = new db.crearDB(user.id, 'usuarios')
        let color = await config.get('xp.color')
        let level = await config.get('xp.nivel')
        let currentXP = await config.get('xp.actual')
        let needXP = await config.get('xp.necesario')
        try {
            
            if(regex().test(argsColor)){
                config.set('xp.color', argsColor)
                color = await config.get('xp.color')
            }
            let img = await render.run(user, color, level, currentXP, needXP, url)
            message.channel.send('Ok este seria un ejemplo de tu tarjeta de xp', { files: [img] })
            config.set('xp.url', url)

        } catch (err) {
            message.channel.send(err.toString())
        }
    }
}