const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();

const io = new Server(server, {
    transports: [ 'polling', 'websocket' ],
    cors: {
        origin: '*',
        credentials: true
    }
})


let rooms = [];
const roomData = {};

io.on('connection', (socket) => {

  socket.on('rooms', (data) => {
    socket.emit('rooms', rooms);
  });

  socket.on('joinCreated', (room) => {
    socket.join(room);
    if (!roomData[room]) {
      roomData[room] = [];
    }

    io.to(room).emit('userJoined', socket.id);

    if (roomData[room]) {
      const data = roomData[room];
      io.to(room).emit('menu', data);
    }

    if (!rooms.includes(room)) {
      rooms.push(room);
    }

    socket.on('menu-user', (data) => {
      io.to(room).emit('menu-user', data);
    });

    socket.on('menu', (data) => {
      if (roomData[room]) {
        roomData[room].push(data);
      }
      const obj = roomData[room];
      io.to(room).emit('menu', obj);
    })
  });

});

server.listen(5633, () => console.log('server connected'));