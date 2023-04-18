//abre o servidor na porta 9090
const http = require("http");
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Servidor escutando na porta 9090"))

//abre o cliente na porta 9091
const app = require("express")();
app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"))
app.listen(9091, ()=>console.log("Cliente escutando na porta 9091"))


//cliente armazenado por hashmap
const clientes = {};
const jogo={};

const Server = new websocketServer({
    "httpServer": httpServer
})
Server.on("request", pedido => {
    //conecxão
    const conexão = pedido.accept(null, pedido.origin);
    conexão.on("open", () => console.log("Usuário conectado!"))
    conexão.on("close", () => console.log("Usuário desconectado!"))
    //recebe as mensagens do usuario
    conexão.on("message", mensagem => {
        const resultado = JSON.parse(mensagem.utf8Data)


        //onde recebe a mensagem do usuario
        if(resultado.methodo == "novojogo"){
          const idjogo = guid();
          jogo[idjogo] = {
            "id": idjogo,
            "nave": 1
          }

          const payLoad = {
            "methodo": "novojogo",
            "jogo": jogo[idjogo]
          }

          const con = clientes[idcliente].conexão;
          con.send(JSON.stringify(payLoad))
        }
        
        if(resultado.methodo == "jogando"){
          
        }
    })


    //gera um id de cliente
    const idcliente = guid();
    clientes[idcliente] = {
        "conexão":  conexão
    }

    const payLoad = {
        "methodo": "connect",
        "idcliente": idcliente
    }
    //manda de volta a conexão do cliente
    conexão.send(JSON.stringify(payLoad))

})


//função para id de usuario
function guid() {
    return ((((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + "-" + 
    (((1+Math.random())*0x10000)|0).toString(16).substring(1) + "-4" + (((1+Math.random())*0x10000)|0).toString(16).substring(1).substr(0,3) + "-" + 
    (((1+Math.random())*0x10000)|0).toString(16).substring(1) + "-" + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + 
    (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1)).toLowerCase(); 
}


//jogo





