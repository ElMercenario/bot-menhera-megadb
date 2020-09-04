module.exports = {
    name: "eval",
    execute: async (client, chalk, args) => {
        if (!args.length) {
            console.log("no pusiste codigo para evaluar");
            return
        }
        try {

            let evaluado = await eval(args.join(" "))
            console.log(evaluado);

        } catch (err) {
            console.log(chalk.red(`ERROR: ${err}`));
        }

    }
}