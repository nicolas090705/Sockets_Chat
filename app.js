//SERVIDOR
var express = require('express');
var app = require('express')();
var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('view engine', 'ejs');
//path.join() concatena los directorios
app.set('views', path.join(__dirname, 'views'));

//para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => console.log('http://localhost:3000'));

// app.use(express.static('public'));

//__dirname path completa
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

//rutas
app.post('/usu',(req,res)=>{
  let usuario = req.body.Usuario
  console.log("usuario: ",usuario);
  res.render('chat',{usuario:usuario});  
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