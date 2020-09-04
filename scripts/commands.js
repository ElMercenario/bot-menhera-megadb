const readline = require('readline')

module.exports = {
    run(client, _ascii, fs) {
        console.info('Buscando comandos...');
        let commandFiles
        var commandCount = 0
        fs.readdirSync('./commands').map(carpetas => {
            client.categoria.push(carpetas)
            try {
                commandFiles = fs.readdirSync(`./commands/${carpetas}`).filter((file) => file.endsWith(".js"))
            } catch (err) {
                process.emit('error', 3, undefined, err)
            }

            if (!commandFiles.length) {
                process.emitWarning(`La carpeta ./commands/${carpetas} No tiene ningun comando`, 'Alerta');
            } else {
                commandFiles.map(file => {
                    try {
                        const command = require(`../commands/${carpetas}/${file}`)

                        if (!command.name) {
                            process.emit('error', 6, `./commands/${carpetas}/${file}`)
                        }
                        if (!command.execute) {
                            process.emit('error', 5, `./commands/${carpetas}/${file}`)
                        }
                        if(!command.permissions){
                            process.emit('error', 10, `./commands/${carpetas}/${file}`)
                        }
                        client.commands.set(command.name, command);

                        commandCount++
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write(`Correcto! Se cargaron ${commandCount} comandos`);
                    } catch (err) {
                        process.emit('error', 9, `./commands/${carpetas}/${file}`, err)
                    }
                })
                try {
                    const y = require(`../commands/${carpetas}/index.json`)
                    if (y.disable == undefined) {
                        process.emit('error', 81, `./commands/${carpetas}/index.json`)
                        return
                    }
                } catch (err) {
                    process.emit('error', 8, `./commands/${carpetas}/index.json`, err)
                }

            }
        })
        console.log(`\n`);
    }
}
