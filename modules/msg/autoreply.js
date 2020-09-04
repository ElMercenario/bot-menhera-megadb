const Discord = require('discord.js')
const enfriamiento = new Discord.Collection();
const db = require('megadb')
module.exports = {
    run: async (message) => {
        if (message.author.bot) return
        // respuestas automaticas
        if (!enfriamiento.has('F')) {
            enfriamiento.set('F', new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = enfriamiento.get('F');
        const cooldownAmount = 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                return
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (!message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) {
            return
        }

        let mensaje = message.content.toLowerCase()

        let config = new db.crearDB(message.guild.id, 'servidores')
        let activado = await config.get('mensajes.autoReply')
        if (activado == undefined || activado == true) {
            if (mensaje.startsWith('hola')) {
                var Saludos = [
                    "hola",
                    "hey",
                    "buen dia, tarde o noche",
                    "hola mis bolas XD",
                    "ok boomer",
                ];
                message.channel.send(Saludos[Math.floor(Math.random() * Saludos.length)]);
                return
            } else if (mensaje == 'f' || mensaje == 'efe' || mensaje == 'ef') {
                const embed_f = new Discord.MessageEmbed()
                    .setDescription(message.author.username + " ha mostrado sus respetos")
                    .setColor("RANDOM")
                    .setImage("https://gluc.mx/u/fotografias/m/2019/12/30/f608x342-21614_51337_0.png");
                message.channel.send(embed_f).catch(err=>err);
                return
            }
        } else {
            return
        }
        //fin de las respuestas automaticas
    }
}