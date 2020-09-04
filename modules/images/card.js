const { loadImage, createCanvas } = require('canvas')

module.exports = {
    run: async (member, fondo) => {
        if (!fondo) throw 'El fondo es indefinido'
        if (!member) throw 'El usuario es indefinido'

        const lienzo = createCanvas(1600, 720)
        const ctx = lienzo.getContext('2d')
        const background = await loadImage(fondo).catch(() => {
            throw 'No es una imagen valida, solo de admiten formatos .jpg .png y .gif'
        })

        ctx.drawImage(background, 0, 0, lienzo.width, lienzo.height)

        ctx.font = "30px Arial"
        ctx.fillStyle = "#FFFF"
        ctx.textAlign = "center"
        ctx.fillText(`Hola! ${member.tag} espero que sea de tu agrado el servidor`, lienzo.width / 2, (lienzo.height / 2) + (lienzo.height / 2 / 2) + (lienzo.height / 2 / 2 / 2) + (lienzo.height / 2 / 2 / 2 / 2))

        ctx.font = '90px Impact'
        ctx.fillStyle = '#ffff'
        ctx.textAlign = 'center'
        ctx.fillText(`Bienvenido`, lienzo.width / 2, (lienzo.height / 2) + (lienzo.height / 2 / 2))

        const radio = 170,
            x = lienzo.width / 2 - radio,
            y = lienzo.height / 2 - (radio * 2);

        ctx.beginPath()
        ctx.arc(x + radio, y + radio, radio + 5, 0, Math.PI * 2, true)
        ctx.fillStyle = "#090A0B"
        ctx.globalAlpha = 0.7;
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        
        ctx.save()
        ctx.beginPath()
        ctx.arc(x + radio, y + radio, radio, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(background, 0, 0, lienzo.width, lienzo.height)

        const userAvatar = await loadImage(member.displayAvatarURL({ dynamic: false, size: 256, format: "png" }))
        ctx.globalAlpha = 1
        ctx.drawImage(userAvatar, x, y, radio * 2, radio * 2)

        return lienzo.toBuffer()

    }

}