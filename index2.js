//abre o servidor na porta 9090
const http = require("http");
const express = require("express");
const webServerApp = express();

//Websocket
const websocketServer = require("websocket").server;
const httpServer = http.createServer(webServerApp);
httpServer.listen(9090, () => console.log("Servidor escutando na porta 9090"));

//Abre o server
webServerApp.get("/", function (req, res) {
  res.sendFile(__dirname + "/server.html");
});

//abre o cliente na porta 9091
const app = require("express")();
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(9091, () => console.log("Cliente escutando na porta 9091"));

//cliente armazenado por hashmap
let conexaoServer = {};
const clientes = {};
const jogo = {};

const Server = new websocketServer({
  httpServer: httpServer,
});














Server.on("request", (pedido) => {
  //conexão
  console.log("alo!");
  const conexao = pedido.accept(null, pedido.origin);
  conexao.on("open", () => console.log("Usuário conectado!")); //NUNCA É EXIBIDO
  conexao.on("close", () => console.log("Usuário desconectado!"));
  //recebe as mensagens do usuario
  conexao.on("message", (mensagem) => {
    const resultado = JSON.parse(mensagem.utf8Data);

    if (resultado.methodo == "conectarServer") {
      conexaoServer = conexao;
    }

    //onde recebe a mensagem do usuario
    if (resultado.methodo == "novojogo") {
      clientes[resultado.idcliente] = {
        conexao: conexao,
      };
      //console.log(resultado);
      console.log("bla");
      //const idjogo = guid();
      const idjogo = resultado.idcliente;
      jogo[idjogo] = {
        id: idjogo,
        nave: 1,
      };

      const payLoad = {
        methodo: "novojogo",
        jogo: jogo[idjogo],
      };

      //const con = clientes[resultado.idcliente].conexao;
      //con.send(JSON.stringify(payLoad));

      console.log(conexaoServer);
      conexaoServer.send(JSON.stringify(payLoad));

      //console.log(clientes);

      /*clientes[resultado.idcliente] = {
        conexao: conexao,
      };*/
    }

    if (resultado.methodo == "jogando") {
      clientes[resultado.idcliente] = {
        conexao: conexao,
      };
      /*console.log(resultado);
      const idjogo = guid();
      jogo[idjogo] = {
        id: idjogo,
        nave: 1,
      };*/

      const payLoad = {
        methodo: "jogando",
        //jogo: jogo[idjogo],
      };

      const con = clientes[resultado.idcliente].conexao;
      con.send(JSON.stringify(payLoad));
    }
    /*clientes[resultado.idcliente] = {
      conexao: conexao,
    };*/
  });

  //gera um id de cliente
  /*const idcliente = guid();

  const payLoad = {
    methodo: "connect",
    idcliente: idcliente,
  };
  //manda de volta a conexao do cliente
  conexao.send(JSON.stringify(payLoad));*/
});

//função para id de usuario
function guid() {
  return (
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    "-" +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    "-4" +
    (((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1)
      .substr(0, 3) +
    "-" +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    "-" +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  ).toLowerCase();
}

//jogo
