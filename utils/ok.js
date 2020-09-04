module.exports = {
    name: 'ok',

    run(mensaje) {
        if (!mensaje) {
            console.log('ok');
        } else {
            console.log(mensaje)
        }
    }
}