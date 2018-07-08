  // =================== //
 // Handler Definitions //    
// ====================//

const handlers = {};

handlers.hello = (data, callback) => {
    callback(200, {'Message': 'Hello!'});
};

handlers.notFound = (data, callback) => {
    callback(404);
};


  // ======================= //
 // Route-Handler Mappings //    
// ===================== //

const router = {
    'hello': handlers.hello
};


// Exporting routes
module.exports = {
    'router': router,
    'handlers': handlers
};