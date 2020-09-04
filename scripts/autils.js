module.exports = {
    run: async (_client, _ascii, fs, readline) => {
        console.log("Buscando Utilidades...");
        let utilsCount = 0;
        fs.readdirSync("./utils").map((utilidad) => {
            utilsCount++;
            const y = require(`../utils/${utilidad}`);
            process.on(y.name, y.run);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`Correcto! Se cargaron ${utilsCount} Utilidades`);
        });
        console.log("\n");
    },
};
