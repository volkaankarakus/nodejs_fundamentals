// Thats the one that gives us networking capabilities such as building an http server
const http = require('http');

// SERVER
const server = http.createServer((req,res) => {
    res.end('Hello from the server!');
});

server.listen(8000,'127.0.0.1',() => {
    console.log('Listening to requests on port 8000');
});