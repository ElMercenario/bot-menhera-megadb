module.exports = {
    name: "send",
    execute(client, chalk, args) {
        if (!args[0]) {
            console.log(chalk.red(`Debes poner la id de un usuario`));
            return
        }

        var user = client.users.cache.find(u => {
            if (u.id == args[0]) {
                return u
            }
        })
        if (!user) {
            console.log(chalk.red(`No se encontro el usuario ${args[0]}`));
            return
        }
        if (!args[1]) {
            console.log(chalk.red(`Debes poner un mensaje para enviar`));
            return
        }
        try {
            user.send(args.slice(1).join(' '))
            console.log(chalk.green(`Envie el mensaje ${args.slice(1).join(' ')} al usuario ${user.username}#${user.discriminator}`));
        } catch (err) {
            console.log(chalk.red(`el usuario ${user.username} no recibe mensajes por md\n${err}`));
        }
    }
}