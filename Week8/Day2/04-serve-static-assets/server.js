const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {

  // Phase 2
  /*
  1. we want to make sure that the files we serve is dynamic(opposite of static)
  2. header content-type can take more than one form. (image/jpeg, text/html)
  return each assets as responses.
  */

  function getContentType(fileName) {
    const ext = fileName.split(".")[1];
    if (ext === 'jpg' || ext === 'jpeg') {
      return "image/jpeg";
    } else if (ext === 'png') {
      return "image/png"
    } else if (ext === 'css') {
      return "text/css"
    } else {
      return "text/plain"
    }

    // switch (ext) {
    //     case "jpg":
    //     case "jpeg":
    //       contentType = "image/jpeg";
    //       break;
    //     case "png":
    //       contentType = "image/png";
    //       break;
    //     case "css":
    //       contentType = "text/css";
    //       break;
    //     default:
    //       contentType = "text/plain";
    //       break;
    //   }
    //   return contentType;
  }

  if (req.method === "GET" && req.url.startsWith('/static')) {
    // response body is equal to whatever file I fetch from 'assets' folder
    const assetPath = req.url.split("/static")[1]
    try {
      const resonseBody = fs.readFileSync("./assets" + assetPath)
      // set my status code to 200
      res.statusCode = 200;
      // set my header content-type to be appropriate extension
      res.setHeader("Content-Type", getContentType(assetPath));
      // end my response with a response body.
      return res.end(resonseBody)
    } catch {
      console.lerror(`Cannot find asset ${assetPath} in assets folder`)
      res.statusCode = 404;
      return res.end();
    }
  }

  // Phase 1 single

  const resonseBody = fs.readFileSync("./index.html"); // <-- this is only one file
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  return res.end(resonseBody);

});

const port = 5050;

server.listen(port, () => console.log('Server is listening on port', port));
