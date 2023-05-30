colors = require('colors')
express = require('express');
app = express();
http = require('http');
server = http.createServer(app);
const { Server } = require("socket.io");
io = new Server(server);

// Variable to keep track of online users
let onlineUsers = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected'.green);

    // Increment online user count and emit the updated count to all connected clients
    onlineUsers++;
    io.emit('userCount', onlineUsers);

    socket.on('disconnect', () => {
        console.log('a user disconnected'.red);

        // Decrement online user count and emit the updated count to all connected clients
        onlineUsers--;
        io.emit('userCount', onlineUsers);
    });
});
server.listen(3000, () => {
    console.log('listening on port:3000'.yellow);
});