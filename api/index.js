/* 
This observer will go to get_stats.js
*/
let IndexObserver = {
    next: () => {
        io.to('authRoom').emit('registered')
    }
}
module.exports = { IndexObserver };
/*
*თავდაპირველად, ობიექტი გავიტანოთ export-ით, რადგან აღნიშნულ Observer-ს ვიყენებთ სხვა მოდულში.
*სხვა შემთხვევაში დაგვიბრუნდება Circular dependency პრობლემა
*/

const app = require('./app/app');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }
});
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