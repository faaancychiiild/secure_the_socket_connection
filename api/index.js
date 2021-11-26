const app = require('./app/app');
const http = require('http');
const port = process.env.PORT || 3000;

http.createServer(app)
.listen(port, () => {
    console.log('Server is running on port :%s', port);
});