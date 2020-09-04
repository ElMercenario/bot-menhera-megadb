const child = require("child_process")
module.exports = {
    name: "reboot",
    execute() {
        console.log("reiniciando...");
        var bat = require.resolve('../Start.bat');

        let xde = child.spawn(bat)
        xde.stdout.on("data", d => {
            console.log(d.toString());
        })
        xde.stderr.on("data", d => {
            console.error(d);
        })

        setTimeout(() => {
            process.exit(0)
        }, 50);
    }
}