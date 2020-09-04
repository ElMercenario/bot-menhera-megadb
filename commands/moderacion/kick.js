module.exports = {
    name: 'kick',
    description: 'Para expulsar a alguien',
    usage: 'kick <@usuario>',
    aliases:['ki','ck'],
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'KICK_MEMBERS', 'ADD_REACTIONS'],
    category: __dirname.split('\\').pop(),
    disable: false,

    execute: async(message, args)=>{
        message.channel.send('Modulo en construccion')
    }
}
