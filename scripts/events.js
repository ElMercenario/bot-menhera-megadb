module.exports = {
    run(client, _ascii, fs, readline) {
        console.info('Buscando eventos...');
        let eventos = fs.readdirSync('./events')
        var eventCount = 0

        if (!eventos.length) {
            process.emit('error', 2)
        }

        eventos.map(eventFile => {
            try {
                const event = require(`../events/${eventFile}`);
                client.on(event.name, event.run.bind(null, client));
                eventCount++

                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`Correcto! Se cargaron ${eventCount} comandos`);
            } catch (err) {
                process.emit('error', 4, eventFile, err);
            }
        })
        console.log(`\n`);
    }
}
