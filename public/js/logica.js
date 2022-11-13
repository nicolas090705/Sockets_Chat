//escuhcar a apartir de socket todos los eventos que le envia el servidor
//CLIENTE
var socket = io();
var list = document.querySelector('#not');

let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');

var clientes = [];

boton.addEventListener('click', function () {
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };

  if (mensaje.value === '' || usuario.value === '') {
    alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
  } else {
    avisos.innerHTML = '';
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
});

mensaje.addEventListener('keydown', function () {
  socket.emit('chat:escribiendo', usuario.value);
});

socket.on('chat:mensaje', function (data) {
  salida.innerHTML +=
    '<strong>' + data.usuario + '</strong>: ' + data.mensaje + '<br>';
  avisos.innerHTML = '';
});

socket.on('chat:escribiendo', function (data) {
// avisos.innerHTML = `<p><strong>${data}</strong> está escribiendo...</p>`;
  avisos.innerHTML = `<p><strong>${data}</strong> está escribiendo...</p>`;
});

// socket.on('socket_desconectado', function (data) {
//   console.log(data);
//   clientes = clientes.filter(function (cliente) {
//     console.log("assaasa"+cliente);
//     return cliente.id != data.id;
//   });

// });

socket.on('socket_desconectado',(data)=>{
  
  console.log(data);
  // notificaciones.innerHTML += `<p>${usuario.value} con id: <strong>${data}</strong> desconectado. </p>`
  notificaciones.innerHTML += `<p>id: <strong>${data}</strong> desconectado. </p>`
});

socket.on('socket_conectado', function (data) {
  console.log("datagfdgg"+data);
  notificaciones.innerHTML += `<p><strong>${data}</strong> Conectado </p>`
});