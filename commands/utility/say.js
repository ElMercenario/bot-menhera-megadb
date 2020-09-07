const Discord = require('discord.js')
module.exports = {
    name: 'say',
    description: 'Dime que tengo que decir',
    usage: 'say (canal) <mensaje>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args, prefix) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Lo siento pero no tienes permisos para ejecutar este comando').then(m => m.delete({ timeout: 5000 }))
        let canal = message.mentions.channels.first()
        if (!canal) {
            let mensaje = args.slice(0).join(" ")
            if (!mensaje.length) return message.channel.send('Debes poner un mensaje para que yo escriba!')
            message.channel.send(mensaje).catch(err => err)
            return
        }
        let noMencion = args[0]
        if (noMencion.indexOf('<') == -1 && noMencion.indexOf('>') == -1 && noMencion.indexOf('#') == -1) {
            message.channel.send(`Debes poner el canal al principio!\nEjemplo: \`${prefix}say #canal hola\``)
                .then(m => m.delete({ timeout: 10000 }))
            return
        }
        let mensaje = args.slice(1).join(" ");
        if (!mensaje.length) return message.channel.send('Debes poner un mensaje para que yo escriba!')
        let buscar = message.guild.channels.cache.find(c => c.name == canal.name)
        if (!message.guild.me.permissionsIn(buscar).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'])) return message.channel.send('No tengo permisos para enviar mensajes en ese canal <:aquacry:735880078675673168>')
            .then(m => m.delete({ timeout: 5000 }))

        if (!message.guild.me.permissionsIn(message.channel).has('ADD_REACTIONS')) return message.channel.send('Primero dame permisos para añadir reacciones <:aquacry:735880078675673168>')
            .then(m => m.delete({ timeout: 5000 }))

        message.channel.send(`Lo quieres en un embed?`).then(msg => {
            msg.react('✅')
            msg.react('❌')
            const filtro = (reaction, user) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            msg.awaitReactions(filtro, { max: 1, time: 30000, errors: ["time"] }).catch(() => {
                msg.delete()
                message.channel.send('No tomaste una eleccion <:aquacry:735880078675673168>').then(m => m.delete({ timeout: 5000 }))
            }).then(coleccionado => {
                if (!coleccionado) return
                const reaccion = coleccionado.first()
                if (reaccion.emoji.name == "✅") {
                    const embed = new Discord.MessageEmbed()
                        .setDescription(mensaje)
                        .setColor(0x33acdd)
                    msg.delete()
                    buscar.send(embed)
                    message.channel.send("Listo!").then(l => l.delete({ timeout: 5000 }))
                } else if (reaccion.emoji.name == "❌") {
                    msg.delete()
                    buscar.send(mensaje)
                    message.channel.send("Listo!").then(l => l.delete({ timeout: 5000 }))
                }
            })
        })
    }
}