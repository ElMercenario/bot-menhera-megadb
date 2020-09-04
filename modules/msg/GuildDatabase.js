const db = require('megadb'),
    configJSON = require('../../config.json')

module.exports = {

    run: async (message, client) => {
        //iniciar servidor en la base de datos 
        let config = new db.crearDB(message.guild.id, 'servidores')
        let existeConfig = await config.obtener('configuracion')
        if (!existeConfig) {
            config.establecer('configuracion.prefix', configJSON.prefix)
            config.establecer('configuracion.comandosDesactivados', [])
            config.establecer('configuracion.categoriasDesactivadas', [])
            
        }
        let existeMsg = await config.obtener('mensajes')
        
        if(!existeMsg){
            config.establecer('mensajes.autoReply', true)
            config.establecer('mensajes.welcome.img', 'https://images2.alphacoders.com/103/1039991.jpg')
            config.establecer('mensajes.welcome.message', 'Bienvenido al server!')
            config.establecer('mensajes.welcome.channel', 0)
            config.establecer('mensajes.goodbye.message', 'Se fue de el server D:')
            config.establecer('mensajes.goodbye.channel', 0)
        }
    }
}
