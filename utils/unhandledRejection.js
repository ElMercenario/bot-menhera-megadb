const chalk = require("chalk");

module.exports = {
    name: 'unhandledRejection',
    run(reason, promise){
        console.log(chalk.red(`\nOcurrio una rejection inesperada, \nRazon: ${reason}\n`), promise);
        process.stdout.write('->')
    }
}