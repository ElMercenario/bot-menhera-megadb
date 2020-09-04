const fetch = require("node-fetch")
const Discord = require("discord.js")
const { token } = require('../../config.json')
let regex = new RegExp(/(http(s)?:\/\/)?((www|canary|ptb)\.)?(discord(app)?)\.com\/channels\/[0-9]{18}\/[0-9]{18}\/[0-9]{18}/gm)

module.exports = {
    run: async (msg, client, prefix) => {
        if (msg.author.bot) return
        if (regex.test(msg.content)) {
            let arrayLink = msg.content.split("/")
            let [idServer, idCanal, idMsg] = arrayLink.splice(-3)
            let obtenido = await fetch(`https://discord.com/api/v8/channels/${idCanal}/messages/${idMsg}`, {
                method: "get",
                headers: {
                    Authorization: `Bot ${token}`
                }
            })

            if (obtenido.status == 200) {
                let msgObtenido = await obtenido.json()
                msg.delete().catch(err => err)
                if (msgObtenido.content.length && msgObtenido.embeds.length) {
                    let embed
                    msgObtenido.embeds.map(mapEmbed => {
                        embed = new Discord.MessageEmbed(mapEmbed)
                    })
                    msg.channel.send(msgObtenido.content, embed)
                    return

                } else if (msgObtenido.content.length) {
                    const embedLink = new Discord.MessageEmbed()
                        .setAuthor(`${msgObtenido.author.username} • ${msgObtenido.timestamp.replace(/-/g, "/").slice(0, 10)}`, `https://cdn.discordapp.com/avatars/${msgObtenido.author.id}/${msgObtenido.author.avatar}.png`)
                        .setDescription(msgObtenido.content)
                        .setColor("RANDOM")
                        .addField("Jump", `[Jump to message](https://discord.com/channels/${idServer}/${idCanal}/${idMsg.slice(0, 18)})`, true)
                        .addField("Channel", `<#${msgObtenido.channel_id}>`, true)
                    msg.channel.send(embedLink)
                    return

                } else if (msgObtenido.embeds.length) {
                    let titulo = (`**Mensaje por:** ${msgObtenido.author.username} \n**En:** <#${msgObtenido.channel_id}> • At: ${msgObtenido.timestamp.replace(/-/g, "/").slice(0, 10)}`)
                    msgObtenido.embeds.map(mapEmbed => {
                        const embed = new Discord.MessageEmbed(mapEmbed)
                        msg.channel.send(titulo, embed)
                    })
                    return

                } else if (msgObtenido.attachments.length) {

                    const embedAtt = new Discord.MessageEmbed()
                        .setAuthor(`${msgObtenido.author.username} • ${msgObtenido.timestamp.replace(/-/g, "/").slice(0, 10)}`, `https://cdn.discordapp.com/avatars/${msgObtenido.author.id}/${msgObtenido.author.avatar}.png`)
                        .setColor("RANDOM")
                        .addField("Jump", `[Jump to message](https://discord.com/channels/${idServer}/${idCanal}/${idMsg.slice(0, 18)})`, true)
                        .addField("Channel", `<#${msgObtenido.channel_id}>`, true)
                    msgObtenido.attachments.map(mapAtt => {
                        const att = new Discord.MessageAttachment(mapAtt.url, mapAtt.filename)
                        embedAtt.attachFiles([att])
                        embedAtt.setImage(`attachment://${mapAtt.filename}`)
                    })
                    msg.channel.send(embedAtt)
                    return
                }
            }
            return
        }
    }
}
