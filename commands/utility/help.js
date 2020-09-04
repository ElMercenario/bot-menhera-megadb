const fs = require('fs')
const discord = require('discord.js')
const version = require('../../package.json')

module.exports = {
    name: 'help',
    description: 'Para obtener ayuda sobre los comandos',
    usage: 'help',
    aliases: ['he', 'lp'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: false,

    execute: async (message, args, prefix, client) => {
        const carpetas = fs.readdirSync('././commands')
        let argumentos = args[0] || '__________'

        argumentos = argumentos.toLowerCase()

        const command = client.commands.get(argumentos) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(argumentos));

        if (!args.length) {
            const embed = new discord.MessageEmbed()
                .setTitle(`Comados de ${client.user.username}`)
                .setDescription(`Ahora mismo hay \`${carpetas.length}\` categorias y \`${client.commands.size.toLocaleString()}\` comandos para ti\n`)
                .setColor('RANDOM')
                .addField('• Categorias', carpetas.map(category => {
                    return `\`${prefix}help ${category}\` ║ ${category.charAt(0).toUpperCase() + category.substr(1)}`
                }))
                .addField('• Enlaces útiles:', '[Donaciones](https://ko-fi.com/bototaku) ║ [Documentacion](https://no-hayxd.com) ║ [Soporte](https://discord.gg/KxNHeaz) ║ [Invitame](https://discord.com/oauth2/authorize?client_id=732398026878091284&scope=bot&permissions=8)')
                .setFooter(`${client.user.username} version ${version.version}`, client.user.displayAvatarURL())
                .setThumbnail('https://cdn.discordapp.com/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png')
            message.channel.send(embed)
            return
        }

        if (!command) {
            if (carpetas.indexOf(argumentos) > -1) {
                const comandos = fs
                    .readdirSync(`././commands/${argumentos}`)
                    .filter(c => c.endsWith('.js'))
                const detalles = new discord.MessageEmbed()
                    .setTitle(`Categoria ${argumentos}, encontré ${comandos.length} comandos`)
                    .setDescription(`Para obtener ayuda más detallada sobre un comando utiliza \`${prefix}help[comando]\``)
                    .setThumbnail('https://cdn.discordapp.com/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png')
                    .setColor('RANDOM')
                    .setFooter(`${client.user.username} version ${version.version}`, client.user.displayAvatarURL());
                if (!comandos.length) {
                    detalles.addField('• Comandos', 'No hay comandos en esta categoria')
                } else {
                    detalles.addField('• Comandos', comandos.map(comando => {
                        const detail = require(`../${argumentos}/${comando}`)
                        return `\`\`\`md\n• ${prefix}${detail.name}\n• ${detail.description}\n\`\`\``
                    }).join(' '))
                }
                message.channel.send(detalles)
                return
            } else {
                return
            }
        } else {
            const comando = new discord.MessageEmbed()
                .setTitle(`Acerca de el comando ${command.name.charAt(0).toUpperCase() + command.name.substr(1)}`)
                .addField(`• Nombre: `, `${command.name.charAt(0).toUpperCase() + command.name.substr(1)}`)
                .addField(`• Descripcion: `, command.description)
                .addField(`• Uso: `, `\`\`\`md\n${prefix}${command.usage}\`\`\``)
                .setColor('RANDOM')
                .setFooter(`Consultado por: ${message.author.username} • Syntaxis: <requerido> (opcional) a / b`, message.author.displayAvatarURL())
                .setThumbnail('https://cdn.discordapp.com/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png')
            if (!command.aliases) {
                comando.addField(`• Permisos: `, `\`\`\`${command.permissions.join(', ')}\`\`\``)
                message.channel.send(comando)
                return
            } else {
                comando.addField(`• Aliases:`, command.aliases.map(si => {
                    var no = ''
                    return no + `\`${prefix}${si}\``
                }))
                comando.addField(`• Permisos: `, `\`\`\`${command.permissions.join(', ')}\`\`\``)
                message.channel.send(comando)
                return
            }
        }
    }
}
