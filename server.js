const express = require('express');
const fs = require('fs')
const app = express();
const http = require('https');
//const server = http.createServer(app);

 const server = http.createServer({
   key: fs.readFileSync('C:/laragon/etc/ssl/laragon.key'),
   cert: fs.readFileSync('C:/laragon/etc/ssl/laragon.crt')
 },app);
const { Server } = require("socket.io");
const io = new Server(server);


const porta1 = 9091;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/controle.html');
});
app.get('/tela', (req, res2) => {
  res2.sendFile(__dirname + '/tela.html');
});

io.on('connection', (socket) => {
  
  console.log('usuário conectado');
  socket.on('chat message', (msg) => {
    io.emit('hello', msg);
  });

  socket.on('disconnect', () => {
    console.log('usuário desconectado');
  });

  socket.on('gamma', (gamma) => {
    console.log(gamma)
    io.emit('coordenada', gamma);
  });

});

server.listen(porta1, () => {
  console.log(`listening on *: ${porta1}`);
});