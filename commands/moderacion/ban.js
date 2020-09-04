module.exports = {
    name: 'ban',
    description: 'Si se lo merece no lo pienses dos veces (⌐■_■)',
    usage: 'ban <@usuario>',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'BAN_MEMBERS', 'ADD_REACTIONS'],
    category: __dirname.split('\\').pop(),
    disable: false,

    execute: async(message, args)=>{
        message.channel.send('Se ejecutó el comando ban')
    }
}
