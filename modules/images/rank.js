const canvas = require('canvas');

module.exports = {
    run: async (user, colorD, level, currentXP, neededXP, background) => {
        let bg = background;
        let color = colorD
        if (!user) throw 'El mensaje es indefinido';
        if (!color) color = '#cd5c5c'
        if (!level) throw 'El nivel es indefinido';
        if (!currentXP === Boolean) throw 'El xp actual es indefinido';
        if (!neededXP === Boolean) throw 'El xp necesario es indefinido';
        if (!bg) bg = '././img/Wallpaper.png';
        const lienzo = canvas.createCanvas(934, 282)
        const ctx = lienzo.getContext('2d')
        let opacity = 0.5
        let b = await canvas.loadImage(bg).catch(err=>{
            throw 'La imagen de fondo no es valida'
        })
        let avatar = await canvas.loadImage(user.displayAvatarURL({ dynamic: false, size: 1024, format: "png" }))
        let temp = lienzo.width - 250
        //Fondo
        ctx.fillStyle = "#23272A"
        ctx.save()
        ctx.beginPath();
        roundRect(ctx, 0, 0, 934, 282, 5, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(b, 0, 0, 934, 282);
        ctx.restore();
        //tras fondo
        ctx.save()
        ctx.fillStyle = "#090A0B";
        if (b) ctx.globalAlpha = opacity;
        else ctx.globalAlpha = 0.1 * 100 / 10;
        roundRect(ctx, 24, 36, 886, 210, 10, true);
        ctx.restore()
        //fondo avatar
        ctx.save()
        ctx.beginPath();
        ctx.arc(122, 142, 84, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = "#090A0B";
        ctx.globalAlpha = 0.7;
        
        ctx.fillRect(38, 58, 168, 168);
        ctx.restore()

        ctx.save()
        ctx.beginPath();
        ctx.arc(121, 142, 80, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 41, 62, 160, 160);
        ctx.restore()
        ctx.save()

        ctx.fillStyle = "#c9c9c9";
        ctx.globalAlpha = 0.5;
        roundRect(ctx, 258, 184, 632, 36, 24, true);
        ctx.restore()
        
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 0.8;
        roundRect(ctx, 256, 182, 636, 40, 25, true);
        ctx.restore()
        ctx.save()

        let widthXP = (currentXP * 615) / neededXP;
        if (widthXP > 615 - 18.5) widthXP = 615 - 18.5;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.arc()
        ctx.arc(257 + 20, 147.5 + 18.5 + 36.25, 18, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.arc()
        ctx.fillRect(257 + 22, 147.5 + 36.25, widthXP, 35.9);
        ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18, 0, Math.PI * 2, false);
        ctx.fill();
        let us = user.username.length > 15 ? user.username.substring(0, 17) + "..." : user.username;

        var name = us
        ctx.font = '40px Impact'
        ctx.fillStyle = 'white';
        ctx.textAlign = "left";
        ctx.fillText(name, 260, 162)

        let left = ctx.measureText(name).width + 277

        ctx.save()
        ctx.font = '25px Impact'
        ctx.fillStyle = '#7F8384';
        ctx.textAlign = "left";
        ctx.fillText(`#${user.discriminator}`, left, 162)
        ctx.restore()

        ctx.save()
        ctx.font = '25px Impact'
        ctx.fillStyle = 'white';
        ctx.textAlign = "left";
        ctx.fillText(`LEVEL:`, temp, 99)
        ctx.restore()

        ctx.save()
        ctx.font = '45px Impact'
        ctx.fillStyle = 'white';
        ctx.textAlign = "left";
        ctx.fillText(level, temp + 87, 99)
        ctx.restore()

        let xp = currentXP

        let need = `/ ${neededXP} XP`

        ctx.font = '25px Impact'
        ctx.fillStyle = 'white';
        ctx.textAlign = "left";
        ctx.fillText(xp, 707, 165)

        left = ctx.measureText(xp).width + 710

        ctx.font = '25px Impact'
        ctx.fillStyle = '#7F8384';
        ctx.textAlign = "left";
        ctx.fillText(need, left, 165)

        return lienzo.toBuffer()
    }
};

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}