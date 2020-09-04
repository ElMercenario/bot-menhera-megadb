const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'goodbye',
    description: 'Configura las despedidas',
    usage: 'goodbye < channel o chnl / message o msg >',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: false,
    execute: async (message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('No tienes permisos para ejecutar este comando')
        if (!args[0]) return message.channel.send('Debes especificar una accion a realizar con \`channel o chnl\` y \`message o msg\`')
        const config = new db.crearDB(message.guild.id, 'servidores')
        switch (args[0]) {
            case 'chnl':
            case 'channel':
                if (!args[1]) return message.channel.send('debes mencionar un canal o escribir \`del\` para desactivarlo\`')
                if (args[1] == 'del') {
                    config.set('mensajes.goodbye.channel', 0)
                    message.channel.send('Ok desactive el canal de despedidas')
                    return
                }
                let canal = message.mentions.channels.first()
                if (!canal) {
                    message.channel.send('Debes mencionar un canal!')
                    return
                }
                if (!message.guild.me.permissionsIn(canal).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                    message.channel.send('No tengo permisos para configurar ese canal como el de despedidas')
                    return
                }
                config.set('mensajes.goodbye.channel', canal.id)
                message.channel.send(`Ok ahora el canal de despedidas es <#${canal.id}>`)
                break;
            case 'msg':
            case 'message':
                if (!args[1]) return message.channel.send('Debes poner un mensaje de bienvenida\npuedes usar \`{user}\` \`{guild}\` \`{membercount}\`')
                if (args[1] == 'del') {
                    config.set('mensajes.goodbye.message', '{user} Se fue de el server')
                    message.channel.send(`Ok reestableci el mensaje de despedidas a \n{user} Se fue de el server`)
                    return
                }
                let mensaje = args.slice(1).join(' ')
                config.set('mensajes.goodbye.message', mensaje)
                let regexUser = /{user}/g
                let regexGuild = /{guild}/g
                let regexMemberCount = /{membercount}/g
                mensaje = mensaje.replace(regexUser, message.author.tag).replace(regexGuild, message.guild.name).replace(regexMemberCount, message.guild.memberCount)
                const embed = new Discord.MessageEmbed()
                    .setTitle('Ok ahora el mensaje de despedida es:')
                    .setDescription(mensaje)
                    .setColor('RANDOM')
                message.channel.send(embed)
                break;
            default:
                message.channel.send('Esa accion no existe \nDebes especificar una accion a realizar con \`channel o chnl\` y \`message o msg\`')
                break;
        }
    }
}