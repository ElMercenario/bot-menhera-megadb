module.exports = {
    name:"show",
    execute(client, chalk, args){
        if(!args.length){
            console.log(client);
            return
        }
        let argum = args.join()
        console.log(client[argum]);
    }
}