//Step 1: load path and express
const express = require("express");
const path = require("path");

//Step 2: create an instance of the application
const app = express();

//Step 3: define routes
// GET /time -> HTTP
app.get('/time',(req, resp) => {
    //status
    resp.status(200);
    resp.type('text/html');
    resp.send(`<h1>The current time is ${new Date()}</h1>`);
});
// GET / -> HTTP
app.get('/',(req, resp) => {
    const userAgent = req.get('User-Agent');
    //status
    resp.status(200);
    resp.type('text/html');
    resp.send(`<h1>Hello ${userAgent}</h1>`);
});

//Serves from public

//Step 4: start the server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
}
);