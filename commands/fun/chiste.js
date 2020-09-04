const fetch = require('node-fetch');
module.exports = {
    name: 'chiste',
    description: 'Te envio un chiste totalmente aleatorio y malo',
    usage: 'chiste',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    category: __dirname.split('\\').pop(),
    disable: true,
    execute: async (message, args) => {
        fetch('http://risapi.glitch.me/')
            .then(res => res.json())
            .then(json => message.channel.send(`\`\`\`${json.chiste}\`\`\``));
    }
}
