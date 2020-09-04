const db = require('megadb')
module.exports = {
    name: 'guildMemberRemove',
    run: async (client, member) => {
        let config = new db.crearDB(member.guild.id, 'servidores')
        let idCanal = await config.get('mensajes.goodbye.channel')
        if (idCanal == 0) return
        let canal = client.channels.cache.find(c => c.id == idCanal)
        let mensaje = await config.get('mensajes.goodbye.message')
        let regexUser = /{user}/g
        let regexGuild = /{guild}/g
        let regexMemberCount = /{membercount}/g
        mensaje = mensaje.replace(regexUser, member.user.tag).replace(regexGuild, member.guild.name).replace(regexMemberCount, member.guild.memberCount)
        canal.send(mensaje)
    }
}