// 代码生成时间: 2025-10-04 02:58:17
// Require necessary modules
const http2 = require('http2');
const fs = require('fs');

// Define the server configuration
const serverOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Create an HTTP/2 server
const server = http2.createSecureServer(serverOptions, (req, res) => {
  // Handle requests
  console.log(`Received request: ${req.method} ${req.url}`);

  // Basic error handling
  if (req.url === '/error') {
    res.writeHead(500);
    res.end('Internal Server Error');
    return;
  }

  // Handle GET requests
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Hello, HTTP/2!');
  } else {
    // Handle other methods
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
});

// Listen on port 8443
server.listen(8443, () => {
  console.log('Server is running on https://localhost:8443');
});
