const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "reload",
    execute(client, chalk, args) {
        if (!args.length) {
            console.log(chalk.red("Debes poner un comando para recargar!"));
            return
        }
        if (args[1]) {
            console.log(chalk.red("Solo puedes poner un comando para recargar!"));
            return
        }
        if (args[0] == 'all') {
            delete client.commands, client.categoria;
            client.commands = new Discord.Collection();
            client.categoria = []

            let commandFiles
            fs.readdirSync('./commands').map(carpeta => {

                client.categoria.push(carpeta)
                try {
                    commandFiles = fs.readdirSync(`./commands/${carpeta}`).filter((file) => file.endsWith(".js"))
                } catch (err) {
                    process.emit('error', 3, undefined, err)
                }

                if (!commandFiles.length) {
                    process.emitWarning(`La carpeta ./commands/${carpeta} No tiene ningun comando`, 'Alerta');

                } else {
                    commandFiles.map(file => {
                        try {

                            delete require.cache[require.resolve(`../commands/${carpeta}/${file}`)];
                            const command = require(`../commands/${carpeta}/${file}`)

                            if (!command.name) {
                                process.emit('error', 6, `./commands/${carpeta}/${file}`)
                            }
                            if (!command.execute) {
                                process.emit('error', 5, `./commands/${carpeta}/${file}`)
                            }
                            client.commands.set(command.name, command);
                            console.log(chalk.green(`El comando ${command.name.toUpperCase()} de la categoría ${command.category.toUpperCase()} fue reiniciado`));
                        } catch (err) {
                            console.log(chalk.red(`Ha ocurrido un error reiniciando el comando ${file} de la categoría ${carpeta}`))
                            console.error(err);

                        }
                        try {
                            const y = require(`../commands/${carpeta}/index.json`)
                            if (y.disable == undefined) {
                                process.emit('error', 81, `./commands/${carpeta}/index.json`)
                                return
                            }

                        } catch (err) {
                            process.emit('error', 8, `./commands/${carpeta}/index.json`, err)

                        }
                    })
                }
            })
            return
        }
        var command = client.commands.get(args[0]) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0]));
        if (!command) {
            console.log(chalk.red(`No existe el comando ${args[0]}`));
            return
        }

        try {
            delete require.cache[require.resolve(`../commands/${command.category}/${fs.readdirSync(`./commands/${command.category}`).map(file => {
                const s = require(`../commands/${command.category}/${file}`)
                if(s.name == command.name){
                    return file
                }else{
                    return undefined 
                }
            }).filter(Boolean)}`)];
            const newCommand = require(`../commands/${command.category}/${fs.readdirSync(`./commands/${command.category}`).map(file => {
                const s = require(`../commands/${command.category}/${file}`)
                if(s.name == command.name){
                    return file
                }else{
                    return undefined
                }
            }).filter(Boolean)}`);
            client.commands.set(newCommand.name, newCommand);
            console.log(chalk.green(`El comando ${newCommand.name.toUpperCase()} de la categoría ${newCommand.category.toUpperCase()} fue reiniciado`))

        } catch (error) {
            console.log(chalk.red(`Ha ocurrido un error reiniciando el comando ${command.name.toUpperCase()} de la categoría ${command.category.toUpperCase()}`));
            console.error(error);
        }
    }
}