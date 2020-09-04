const db = require('megadb')
const fs = require('fs')
module.exports = {
    name: 'guildDelete',
    run(client, guild) {
        console.log(`\nHe sido eliminado de el servidor ${guild.name}`);
        fs.unlinkSync(`./mega_databases/servidores/${guild.id}.json`)
        console.log(`Se a eliminado correctamente la base de datos el el servidor ${guild.name}`);
        process.stdout.write('->')
    }
}