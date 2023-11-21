const http = require("http");

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    //affiliate=nasa&query=mars+rover%21&commit=Search
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      req.body = reqBody
        .split("&") //[affiliate=nasa,query=mars+rover%21,commit=Search]
        .map((keyValuePair) => keyValuePair.split("=")) //[[affiliate,nasa],[query,mars+rover%21],[commit,Search]]
        .map(([key, value]) => [key, value.replace(/\+/g, " ")]) //[[affiliate,nasa],[query,mars rover%21],[commit,Search]]
        .map(([key, value]) => [key, decodeURIComponent(value)]) //[[affiliate,nasa],[query,mars rover!],[commit,Search]]
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      console.log(req.body); // {key1:val1, key2:val2,...}
    }
    // Do not edit above this line

    // define route handlers here
    if (req.method === 'GET' && req.url === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Dog Club');
    }

    if (req.method === 'GET' && req.url === '/dogs') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Dogs index');
    }

    // BONUS
    if (req.method === 'GET' && req.url.startsWith('/dogs')) {
      const urlParts = req.url.split('/') // [ '', 'dogs', '1' ]
      const dogId = urlParts[2];

      // GET /dogs/:dogId
      if (urlParts.length === 3) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        return res.end(`Dog details for dogId: ${dogId}`);
      }

      // GET /dogs/:dogId/edit
      if (urlParts.length === 4 && urlParts[3] === 'edit') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end(`Dog edit form page for dogId: ${dogId}`);
      }
    }

    // GET /dogs/new
    if (req.method === 'GET' && req.url === '/dogs/new') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Dog create form page');
    }

    // POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      res.statusCode = 302;
      const dogId = getNewDogId()
      res.setHeader('Location', `/dogs/${dogId}`)
      return res.end();
    }


    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("No matching route handler found for this endpoint");
  });
});

const port = 5050;

server.listen(port, () => console.log('Server is listening on port', port));
