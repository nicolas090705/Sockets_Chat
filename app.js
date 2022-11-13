//SERVIDOR
const express = require('express');
var app = require('express')();


var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('view engine', 'ejs');

//para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => console.log('http://localhost:3000'));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public');
});

//rutas
app.post('/Sockets_Chat/views/usu',(req,res)=>{
  let usuario = req.body.Usuario
  console.log("usuario: ",usuario);
  res.render('/Sockets_Chat/views/chat',{usuario:usuario});  
});

io.on('connection',(socket)=>{
  console.log('nueva conexion', socket.id);
  io.sockets.emit('socket_conectado',socket.id);

  socket.on('chat:mensaje',(data)=>{
    io.sockets.emit('chat:mensaje',data);
  });

  socket.on('chat:escribiendo',(data)=>{
    socket.broadcast.emit('chat:escribiendo',data);
    //console.log(data)
  });
  
  socket.on('disconnect', () => {
    console.log(`socket desconectado ${socket.id}`);
    io.sockets.emit('socket_desconectado',socket.id);
  });

});