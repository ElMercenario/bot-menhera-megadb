const { meme } = require('memejs');

module.exports = {
    name: 'meme',
    description: 'Te envio los mejores memes de reddit',
    usage: 'meme',
    aliases: ['momo', 'memes'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args) => {
        message.channel.startTyping()
        let memes = ["MemesESP", "spanishmemes", "SpanishMeme", "mexico", "MemesEnEspanol"]
        let random = Math.round(Math.random() * memes.length)
        meme(memes[random], function (err, data) {
            if (err) {
                console.error(err)
                message.channel.send('Momento sad\nHubo un error al tratar de buscar memes, intentalo de nuevo ')
                    .then(m => m.delete({ timeout: 10000 }))
                message.channel.stopTyping()
                return
            }
            message.channel.send(`${data.title}\n${data.url}`)
                .catch(err => {
                    message.channel.send('Momento sad\nHubo un error al tratar de buscar memes, intentalo de nuevo ')
                        .then(m => m.delete({ timeout: 10000 }))
                    message.channel.stopTyping()
                    return
                })
        })
        message.channel.stopTyping()
    }
}