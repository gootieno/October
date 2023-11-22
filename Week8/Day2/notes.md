# W8D2 Notes


## Objectives
1. Get familiar with a request <> response cycle
2. Create and host a NodeJS server using `http`
3. Understand the main components of both `req` and `res`
  3.1 Request line
  3.2 Headers (Content-Type)
  3.3 Body
4. Know the definition and the use case of `route handlers`
5. Know the definition and the use case of `static assets`
6. Understand the flow of parsing the request body
7. Know the definition and the use case of `HTML templating`

---
### 1. Get familiar with a request <> response cycle

![alt text](https://www3.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_Steps.png)

### 2. Create and host a NodeJS server using `http`
```js
// Bare minimum components of a http server
const http = require('http');

// (Place any helper functions)

const server = http.createServer((req, res) => {
  // (Place route handlers)
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
```

### 3. Understand the main components of both `req` and `res`

#### Request

1. Request-line (method, url, http version)
2. Headers (Content-Type)
3. Body (key=value&key=value)

**Common `req` object usage:**
  - req.method
  - req.url
  - req.on("data")

#### Response

1. Status
```
  - 200 OK: request fulfilled
  - 201 Created: request fulfilled, new record created
  - 301 Moved permanently: request resources moved elsewhere
  - 302 Found: request fulfilled, moved temporarily (during development cycle, redirecting)
  - 400 Bad Request: request received, but server doesn't understand it
  - 401 Unauthorized: resource may exist, but you're not allowed to make the request (maybe not logged in)
  - 403 Forbidden: resource may exist, but you're absolutely not allowed (even after logging in)
  - 404 Not Found: resource does not exist
  - 500 Internal Server Error: request received, but something went wrong when fulfilling
  - 504 Gateway Timeout: request received, but didn't process within the reasonable time
```
2. Headers
3. Body

**Common `res` object usage:**
  - res.status
  - .setHeader("key", "value")
  - .write()
  - .end()

### 4. Know the definition and the use case of `route handlers`

A `route handler` is a set of code that will be executing for a particular route or request method and URL path combination.

```js
if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Splash Page');
}

// ... build more conditionals as needed
```

### 5. Know the definition and the use case of `static assets`

A `static asset` is some data or resource that doesn't change no matter how many times you ask the server for it. It's usually just a file that the server holds in memory and sends to a client when asked for.

```js
const server = http.createServer((req, res) => {
  const catImage = fs.readFileSync('./images/cat.png');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/png');
  res.end(catImage);
});
```

### 6. Understand the flow of parsing the request body

Step 1: Use `req.on("data")` to bind data from the request
```js
let reqBody = ""; // initiate a variable to store body
  req.on("data", (data) => { // listen on "data" event
    reqBody += data; // add the data to the reqBody as a single string
  });
```

Step 2: when the request is finished, parse the request body and turn it into an object
```js
req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      // name=Fido&color=black&age=1&description=Hello+World%21
      req.body = reqBody
        // 1. Form array and split by key-valye pair
        .split("&")
        //[name=Fido, color=black, age=1, description=Hello+World%21]

        // 2. Couple key-value pairs into an array
        .map((keyValuePair) => keyValuePair.split("="))
        // [[name, Fido], [color, black], [age, 1], [description, Hello+World%21]]

        // 3. Replace + with ' '
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        // [[name, Fido], [color, black], [age, 1], [description, Hello World%21]]

        // 4. Decode percent encoding
        .map(([key, value]) => [key, decodeURIComponent(value)])
        // [[name, Fido], [color, black], [age, 1], [description, Hello World!]]

        // 5. Form an object
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
        // {
        //   name: "Fido",
        //   color: "black",
        //   age: "1",
        //   description: "Hello World!"
        // }

      console.log(req.body);
    }
```

### 7. Know the definition and the use case of `HTML templating`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>#{username}'s Profile Page</title>
</head>
<body>
  <h1>Welcome to #{username}'s profile page!</h1>
  <p>#{biography}</p>
  <h2>Comment Box</h2>
  <form method="post" action="/comment">
    <p>To send a comment to #{username}, fill out this form</p>
    <textarea name="commentBody"></textarea>
    <button type="submit">Comment</button>
  </form>
</body>
</html>
```

```js
const fs = require('fs');

// Get the file contents of the profile-page.html as a string
const htmlTemplate = fs.readFileSync('./profile-page.html', 'utf-8');

const htmlPage = htmlTemplate
  // replace all instances of #{username} in the HTML file with 'DemoUser'
  .replace(/#{username}/g, 'DemoUser')
  // replace all instances of #{biography} in the HTML file with 'Hello World!'
  .replace(/#{biography}/g, 'Hello World!');
```
