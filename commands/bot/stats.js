const Discord = require('discord.js')
const version = require('../../package.json')
const os = require("os")


module.exports = {
    name: 'stats',
    description: 'Muestra mis estadisticas',
    usage: 'stats',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args, prefix, client) => {
        let dueño = client.users.cache.find(u => u.id === "355824156127920148")
        const moment = require("moment");
        require('moment-duration-format');

        const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
        const si = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle(`Estadisticas de ${client.user.username}`)
            .addField(`Dueño: `, `\`\`\`${dueño.tag} (${dueño.id})\`\`\``)
            .addField(`Canales: `, `\`\`\`${client.channels.cache.size}\`\`\``, true)
            .addField(`Servidores: `, `\`\`\`${client.guilds.cache.size}\`\`\``, true)
            .addField(`Usuarios: `, `\`\`\`${client.users.cache.size}\`\`\``, true)
            .addField(`Version: `, `\`\`\`${version.version}\`\`\``, true)
            .addField(`libreria: `, `\`\`\`discord.js ${version.dependencies["discord.js"]}\`\`\``, true)
            .addField(`Uptime: `, `\`\`\`css\n${actividad}\`\`\``)
            .addField(`Cpu: `, `\`\`\`${os.cpus().map(m => m.model).shift()} (${os.arch()})\`\`\``)
            .addField(`Uso de cpu: `, `\`\`\`${(process.cpuUsage().user / 1000 / 1000).toFixed(2)} %\`\`\``, true)
            .addField(`Ram: `, `\`\`\`${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1073741824).toFixed(0)} GB\`\`\``, true)

        message.channel.send(si)
    }
}
