// Your code here
const http = require('http'); // <-- comes with nodeJS. no need to "npm install"

// helper functions here

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') { // route handler; specific case for a specific endpoint (method + url)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const responseBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World!</title>
    </head>
    <body>
      <h1>Hello there!</h1>
    </body>
    </html>
    `

    return res.end(responseBody);
}

  // 1.
  // res.write(responseBody)
  // res.end();

  // 2.
  // res.end(responseBody); // <-- same thing
})

const port = 5050;
server.listen(port, () => console.log(`Server is up and running, listening on port ${port}`));
