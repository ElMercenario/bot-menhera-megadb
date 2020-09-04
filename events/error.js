module.exports = {
    name: 'error',
    run(_client, error) {
        console.log(`Ocurrio un error \n${JSON.stringify(error)}`, "error");
    }
}