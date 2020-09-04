const Discord = require("discord.js")
module.exports = {
    name: 'channel',
    description: 'Muestra toda la info de un canal',
    usage: 'channel <#canal>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message) => {
        let canal = message.mentions.channels.first() || message.channel

        const embedCanal1 = new Discord.MessageEmbed()
            .setTitle(`Hacerca de el canal #${canal.name}`)
            .setColor("RANDOM")
            .addField("Nombre: ", `\`\`\`md\n#${canal.name}\`\`\``, true)
            .addField("Tipo: ", `\`\`\`css\n${canal.type}\`\`\``, true)
            .setThumbnail('https://media.discordapp.net/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png?width=492&height=585')
        if (canal.topic) {
            embedCanal1.addField("Tema: ", `\`\`\`${canal.topic}\`\`\``, false)
        }
        embedCanal1.addField("ID: ", `\`\`\`prolog\n${canal.id}\`\`\``, true)
        if (canal.nsfw == true) {
            embedCanal1.addField("nsfw: ", `\`\`\`diff\n+ ${canal.nsfw}\`\`\``, true)
        } else {
            embedCanal1.addField("nsfw: ", `\`\`\`diff\n- ${canal.nsfw}\`\`\``, true)
        }
        message.channel.send(embedCanal1)
    }
}
