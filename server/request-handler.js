/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = {};
messages.results = [];

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  var pathname = request.url;

  // Request methods
  var query = {};

  query.GET = function() {
    response.writeHead(200, headers);
    response.end(JSON.stringify(messages));
  }

  query.POST = function() {
    response.writeHead(201, headers);
    var body = '';
    request.on('data', function(data) {
      body += data;
    });

    request.on('end', function() {
      messages.results.push(JSON.parse(body));
      console.log('DATA: '+ body);
    })
    response.end();
  }

  query.OPTIONS = function() {
    response.writeHead(200, headers);
    response.end();
  }

  // Request Handler
  query[request.method]();
  console.log("Serving request type " + request.method + " for url " + request.url);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

module.exports.requestHandler = requestHandler;
module.exports.defaultCorsHeaders = defaultCorsHeaders;
