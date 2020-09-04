const db = require('megadb')
module.exports = {
    name: 'bugs',
    execute: async (client, chalk, args) => {
        let config = new db.crearDB('bugs')
        if (!args.length) {
            let bugs = await config.datos()
            console.log(bugs);
            return
        }
        if (args[0] == 'ok') {
            if (!args[1]) return console.log('Debes poner una id');
            let a = await config.findKey(false, c => c.id == args[1])
            if (!a) {
                console.log('No encontre el usurio');
                return
            }
            let user = await config.map(false, (v, key) => {
                if (key == args[1]) {
                    config.delete(args[1])
                    return true
                }
            })

            console.log(user);
        }
    }
}