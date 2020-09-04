const db = require('megadb')
module.exports = {
    name: 'bugreport',
    description: 'Reporta un bug que encontraste por ahí',
    usage: 'bugreport <bug>',
    aliases: ['bug'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: true,
    cooldown: 120,
    execute: async (message, args) => {
        try {
            if (!args.length) return message.channel.send('Debes poner un bug para reportar')
            let config = new db.crearDB('bugs')
            let bug = args.join(' ')
            if(bug.length > 1000) return message.channel.send('No puedes poner un bug mayor a 1000 caracteres')
            let user = await config.get(message.author.id)
            if (!user) {
                config.set(`${message.author.id}.id`, message.author.id)
                config.set(`${message.author.id}.username`, message.author.tag)
                config.set(`${message.author.id}.bug`, [bug])
                message.channel.send('Se a reportado el bug correctamente, gracias por apoyar a mejorar este bot')
            } else {
                config.set(`${message.author.id}.id`, message.author.id)
                config.set(`${message.author.id}.username`, message.author.tag)
                config.push(`${message.author.id}.bug`, bug)
                message.channel.send('Se a reportado el bug correctamente, gracias por apoyar a mejorar este bot')
            }
        }catch(err){
            message.channel.send('Lo siento hubo un error al reportar el bug :(')
            console.log('\n', err);
            process.stdout.write('->')
        }
    }
}