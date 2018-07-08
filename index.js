// Dependencies
const http = require('http');
const serverHandler = require('./server');

const server = http.createServer((req, res) => {
    serverHandler(req, res);
});

server.listen(3000, () => console.log('Server is listening on port 3000.'));
