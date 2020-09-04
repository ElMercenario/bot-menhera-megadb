const Discord = require('discord.js')
module.exports = {
    name: 'donate',
    description: 'Te envio informacion hacerca de las donaciones',
    usage: 'donate',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        const exampleEmbed = new Discord.MessageEmbed()
            .setTitle('Donaciones')
            .setDescription('Como ya sabes tienes completamente gratis todo los comandos y demas pero requiero de dinero para poder sostenerme si me donas estaria ayudando a poder mejorarme cada dia mas, mejor ping, mejor experiencia y demas\nDoname un cafe pls:\nhttps://ko-fi.com/bototaku')
            .setColor('RANDOM')
            .setImage('https://cdn.discordapp.com/attachments/736287295522603098/738157976346558464/coffe.png')
            .setThumbnail('https://www.pngitem.com/pimgs/m/507-5073089_menhera-chan-animegirl-menhera-chan-sticker-hd-png.png')

        message.channel.send(exampleEmbed)
    }
}