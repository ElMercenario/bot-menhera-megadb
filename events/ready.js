const fs = require("fs");
const { version } = require("../package.json")
const chalk = require("chalk");

module.exports = {
  name: 'ready',
  run(client) {
    console.log(`El bot ${client.user.username} esta listo!`)
    console.log("======================================================");
    setInterval(() => {
      var estados = [`guilds: ${client.guilds.cache.size}`, `version: ${version}`, `usuarios: ${client.users.cache.size}`]
      var estadosRandom = Math.floor(Math.random() * estados.length)
      client.user.setPresence({
        status: "idle",
        activity: {
          name: estados[estadosRandom],
          type: 'LISTENING'
        }
      })
    }, 10000)

    fs.readdirSync("./console").map(file => {
      const command = require(`../console/${file}`)
      if (command.name) {
        client.console.set(command.name, command)
      } else {
        // hace nada
      }
    })

    var consola = process.openStdin()
    console.log(`\nConsola de ${client.user.username} [Versión ${version}]\nCopyright (c) Daniel Alejandro Palma Garcia. Todos los derechos reservados. `)

    function y() {
      process.stdout.write("->")
    }
    y()

    consola.addListener("data",async d => {
      // var comienzo = Date.now()
      var data = d.toString().toLowerCase().trim()
      if (!data) return y()
      const args = data.slice().trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.console.get(commandName)
      if (!command) return console.log(chalk.hex('#FF8800')(`El comando ${commandName} no existe`)), y()
      await command.execute(client, chalk, args)
      // var fin = Date.now()
      // console.log(`Tiempo de ejecucion ${fin - comienzo} ms`);
      y()

    })

  }
}