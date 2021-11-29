const app = require('./app/app');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }
});
/* 
This observer will go to get_stats.js
*/
exports = {
    next: () => {
        console.log('hisashiburi')
        io.to('authRoom').emit('registered')
    }
}
server.listen(port, () => {
    console.log('Server is running on port :%s', port);
});

io.on('connection', socket => {
    console.log('new connection');
    socket.on('joined', room => socket.join(room));
    socket.on('disconnect', () => {
        console.log('User has just left');
    });
});