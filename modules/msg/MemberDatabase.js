const db = require('megadb')

module.exports = {
    run: async (message, client) => {
        if (message.author.bot) return
        let config = new db.crearDB(message.author.id, 'usuarios')
        let existeMoney = await config.obtener('money')
        if (!existeMoney) {
            config.set('money.efectivo', 0)
            config.set('money.bank', 0)
        }
        let existeXp = await config.get('xp')
        if (!existeXp) {
            config.set('xp.actual', 0)
            config.set('xp.necesario', 100)
            config.set('xp.nivel', 1)
        }
        let existeInventario = await config.get('inventory')
        if (!existeInventario) {
            config.set('inventory.bag', [])
            config.set('inventory.shop.open', false) 
            config.set('inventory.shop.ventas.usuario', 'No hay datos')
            config.set('inventory.shop.ventas.producto', 'No hay datos')
            config.set('inventory.shop.compras.usuario', 'No hay datos')
            config.set('inventory.shop.compras.producto', 'No hay datos')
            config.set('inventory.shop.compras.fecha', 'No hay datos')
            config.set('inventory.shop.productos', [])            
        }
    }
}