const ascii = require("ascii-table")

module.exports = {
    name: "users",
    execute(client, chalk) {
        var users = new ascii().setHeading("Username", "ID", "Es Bot")
        client.users.cache.map(u => {
            users.addRow(`${u.username}#${u.discriminator}`, u.id, u.bot)
        })
        console.log(users.toString());
        delete users
        console.log(chalk.green(`Total: ${client.users.cache.size} Usuarios`));
    }
}