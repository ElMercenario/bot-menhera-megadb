const db = require('megadb')

module.exports = {
    name: 'enable',
    description: 'Activa un comado o categoria que ya este desabilitado',
    usage: 'enable < -c(categoria) / -co(comando) > <nombre>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: false,
    cooldown: 5,

    execute: async (message, args, prefix, client) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('No tienes los permisos para ejecutar este comando').then(m => m.delete({ timeout: 5000 }))
            return
        }
        let config = new db.crearDB(message.guild.id, 'servidores')
        let comandos = await config.obtener('configuracion.comandosDesactivados')
        let categorias = await config.obtener('configuracion.categoriasDesactivadas')
        let opcion = args[0]
        let argumentos = args[1]
        if (!opcion || !opcion == '-c' || !opcion == '-co') {
            message.channel.send('Necesitas poner una opcion a desactivar asi [-c categoria || -co comando]')
            return
        }
        if (opcion == '-c') {
            if (!argumentos) {
                message.channel.send('Debes poner una categoria a activar')
                return
            }
            if (!client.categoria.includes(argumentos)) {
                message.channel.send('Esa categoria no existe')
                return
            }
            if (categorias.includes(argumentos)) {
                config.extract('configuracion.categoriasDesactivadas', argumentos)
                message.channel.send(`Ok habilite la categoria ${argumentos}`)
                return
            } else {
                message.channel.send('Esa categoria ya esta activada')
            }
        }
        if (opcion == '-co') {
            if (!argumentos) {
                message.channel.send('Debes poner un comando a activar')
                return
            }
            const command = client.commands.get(argumentos)
                || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(argumentos));

            if (!command) {
                message.channel.send('Ese comando no existe')
                return
            }
            if (comandos.includes(command.name)) {
                config.extract('configuracion.comandosDesactivados', command.name)
                message.channel.send(`Ok habilite el comando ${argumentos}`)
                return
            } else {
                message.channel.send('Ese comando ya esta activado')
            }
        }
    }
}
