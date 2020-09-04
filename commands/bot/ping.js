const Discord = require("discord.js")
module.exports = {
    name: 'ping',
    description: 'Muestra el ping entre la API de Discord y el bot',
    usage: 'ping',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args) => {
        let ping = Math.round(message.client.ws.ping);
        const embed = new Discord.MessageEmbed()
            .setDescription(`🏓 Pong DiscordAPI: \`${ping} ms\``)
            .setColor("RANDOM")
        message.channel.send(embed);
    }
}
