const Discord = require('discord.js'),
    enfriamiento = new Discord.Collection(),
    db = require("megadb"),
    configJSON = require('../../config.json');

module.exports = {
    run: async (message, client) => {
        if (message.author.bot) return
        if (!enfriamiento.has('F')) {
            enfriamiento.set('F', new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = enfriamiento.get('F');
        const cooldownAmount = 1500;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                return
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        let config = new db.crearDB(message.guild.id, 'servidores')
        let prefix = await config.obtener('configuracion.prefix') || configJSON.prefix

        // si se menciona el bot responde con su prefijo

        if (!message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) {
            return
        }
        let mencion = new RegExp(`^<@!?${client.user.id}>( |)$`);


        if (message.content.match(mencion)) {
            const embed_mencion = new Discord.MessageEmbed()
                .setDescription(`Hola! mi prefijo es: ${prefix} <:mashahello:735880082887016569>`)
                .setColor(0xf1c40f);
            message.channel.send(embed_mencion).catch(err => err);
        }
        //fin de mencion con respuesta
    }
}
