var comienzo = Date.now();
console.clear();
console.info("Iniciando.");
const Discord = require("discord.js"),
  fs = require("fs"),
  ascii = require("ascii-table"),
  config = require("./config.json"),
  readline = require("readline");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.categoria = [];
client.console = new Discord.Collection();

//Ejecucion de scripts
console.log("Ejecutando scripts\n");
fs.readdirSync("./scripts").map(async (handler) => {
  try {
    const x = require(`./scripts/${handler}`);
    await x.run(client, ascii, fs, readline);
  } catch (err) {
    process.emit("error", 7, handler, err);
  }
});
//Fin de la ejecucion de scripts


var fin = Date.now();
process.emit("ok", `Cargado en ${fin - comienzo} ms\niniciando sesion en discord\n`);

client.login(config.token).catch((err) => {
  process.emit("error", 1, config.token, err);
});
//TU TOKEN VA EN EL ARCHIVO DE CONFIGURACION ./config.json