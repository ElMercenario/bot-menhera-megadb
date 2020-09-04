const db = require('megadb')
module.exports = {
    name: 'prefix',
    description: 'Selecciona el prefijo de tu preferencia',
    usage: 'prefix <prefijo>',
    aliases: ['setprefix', 'setprefijo', 'prefijo'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: false,

    execute: async (message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('No tienes los permisos para ejecutar este comando').then(m => m.delete({ timeout: 5000 }))
            return
        }
        let prefix = new db.crearDB(message.guild.id, 'servidores')
        let newprefix = args[0]
        if (!newprefix) {
            message.channel.send('Debes poner un prefix!')
            return
        }
        if (newprefix.length > 3) {
            message.channel.send('No puedes poner un prefijo mayor a 3 caracteres')
            return
        }
        prefix.set('configuracion.prefix', newprefix)
        message.channel.send(`ok ahora mi nuevo prefix va a ser ${newprefix}`)
    }
}
