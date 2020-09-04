module.exports = {
    name: 'error',
    run(exitCode, args, err) {
        console.clear()
        switch (exitCode) {
            case 1:
                console.error(`ERROR exit code 1: El token provicionado es invalido\nToken: ${args}\n\n${err}`);
                break
            case 2:
                console.error(`ERROR exit code 2: No hay ningun evento en la carpeta ./events/\n`)
                break
            case 3:
                console.error(`ERROR exit code 3: Hay un archivo en ./commands muevelo a una carpeta!\n\n${err}`)
                break
            case 4:
                console.error(`ERROR exit code 4: La carpeta ./events/${args} no es valida, solo se admiten archivos\n`, err);
                break
            case 5:
                console.error(`ERROR exit code 5: El archivo ${args} no tiene una exportacion valida\n`)
                break
            case 6:
                console.error(`ERROR exit code 6: El archivo ${args} no tiene configurado el name\n`);
                break
            case 7:
                console.error(`ERROR exit code 7: el archivo ./scripts/${args} no tiene una correcta exportacion o contiene un error\n\n${err}`);
                break
            case 8:
                console.error(`ERROR exit code 8: no existe el archivo de configuracion de categoria ${args}\n\n${err}`);
                break
            case 81:
                console.error(`ERROR exit code 81: no esta correctamente configurado el archivo de configuracion ${args}\n`);
                break
            case 9:
                console.error(`ERROR exit code 9: el archivo ${args} contiene un error\n`, err);
                break
            case 10:
                console.error(`ERROR exit code 10: El comando ${args} no tiene los permisos especificados`)
                break
            default:
                console.error(`ERROR no se proporciono informacion hacerca de el codigo`);
        }
        process.exit()
    }
}
