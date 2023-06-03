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

let menuText = "";
let menuInformation = "";

io.on('connection', (socket) => {
  if (menuText.length > 0) {
    io.emit('menu', [ menuText, menuInformation ]);
  }

  socket.on('menu-user', (data) => {
    io.emit('menu-user', data);
  });

  socket.on('menu', (data) => {
    menuText = data[0];
    menuInformation = data[1];
    io.emit('menu', data);
  });
});

server.listen(5633, () => console.log('server connected'));