const db = require('megadb')

module.exports = {
    name: 'autoreply',
    description: 'Configura si deseas que responda a mensajes automaticamente',
    usage: 'autoreply',
    aliases: ['reply'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: false,
    cooldown: 5,

    execute: async (message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('No tienes permisos para hacer eso ').then(m => m.delete({ timeout: 5000 }))
            return
        }
        let config = new db.crearDB(message.guild.id, 'servidores')
        let activado = await config.get('mensajes.autoReply')
        if (activado == undefined || activado == true) {
            config.establecer('mensajes.autoReply', false)
            message.channel.send('Ok **Desactive** la respuesta automatica a mensajes')
        }
        if (activado == false) {
            config.establecer('mensajes.autoReply', true)
            message.channel.send('Ok **Active** la respuesta automatica a mensajes')
        }
    }
}
