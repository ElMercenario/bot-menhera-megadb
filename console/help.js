const ascii = require('ascii-table');

module.exports = {
    name: "help",
    execute(client) {
        var table = new ascii().setHeading('Comandos de consola')
        client.console.map(c => {
            return table.addRow(c.name)
        })
        console.log(table.toString());
    }
}