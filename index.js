const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    serverHandler(req, res);
});

server.listen(3000, () => console.log('Server is listening on port 3000.'));

// Main server logic
const serverHandler = (req, res) => {
    let parsedUrl = url.parse(req.url, true);

    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');
        
    // Figure out what handler we are using based on the path requested
    let chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Pull the data object together for the send handler
    let data = {
        'trimmedPath': trimmedPath
    };

    chooseHandler(data, (statusCode, _payload) => {
        // Use the status code and payload from the handler's callback, or default to safe values
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        payload = typeof(_payload) == 'object' ? _payload : {};

        // Stringify the payload to make it compatible
        let payloadString = JSON.stringify(payload);

        // Return a response based on the above, specify content type of JSON, too.
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        console.log(`Requested path: ${trimmedPath !== '' ? trimmedPath : path} | Response Status Code: ${statusCode} | Response Payload: ${payloadString}`);
    });
};

// Defines the object containing our handlers
const handlers = {};

// Handler for requests to the /hello endpoint
handlers.hello = (data, callback) => {
    callback(200, {'Message': 'Hello!'});
};

// This handler is defaulted to if no others are found
handlers.notFound = (data, callback) => {
    callback(404);
};

// Setup the routes for handlers
const router = {
    'hello': handlers.hello
};