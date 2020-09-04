const db = require('megadb')
module.exports = {
    name: 'guildMemberAdd',
    run: async (client, member) => {
        let config = new db.crearDB(member.guild.id, 'servidores')
        let buscar = await config.get('mensajes.welcome.channel')
        if (buscar == 0) return
        let img = await config.get('mensajes.welcome.img')
        let msg = await config.get('mensajes.welcome.message')
        let regex = /@{member}/g
        let regex1 = /{member}/g
        if (regex.test(msg)) {
            msg = msg.replace(regex, `<@${member.user.id}>`)
        }else if(regex1.test(msg)){

            msg = msg.replace(regex1, member.user.username)
        }
        msg = msg.replace(/{guild}/g, member.guild.name)
        msg = msg.replace(/{membercount}/g, member.guild.memberCount)

        let canal = client.channels.cache.find(c => c.id == buscar)
        const render = require('../modules/images/card.js')
        let imagen = await render.run(member.user, img).catch(s => {
            console.log(s);
            return
        })
        canal.send(`${msg}`, { files: [imagen] }).catch(err => err)
        // console.log(`\nNuevo usuario en ${member.guild.name}`);
        // process.stdout.write('->')
    }
}