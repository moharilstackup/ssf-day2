//Step 1: load path and express
const express = require("express");
const path = require("path");

//Step 2: create an instance of the application
const app = express();

//Step 3: define routes
// Log every request that comes in
app.use((req, resp, next) => {
    console.log(`****** ${new Date()}, ${req.method}, ${req.originalUrl}`);
    next();
});

//app.use(express.static('public'))
//app.use(express.static('files'))
// GET /image/cat.png  -> HTTP
//app.use(express.static('/image'));
// app.use(express.static(__dirname + "/image"));
// app.get("/image", (req, resp) => {
//     resp.status(202);
//     resp.type('jpg');
//     resp.sendfile("cat.jpg");
// });
app.get('/image/cat.jpg', (req, resp) => {
    //status
    resp.status(203);
    resp.type('jpg');
    resp.sendfile("cat.jpg");
    // console.log(`Response type, ${resp.status}`);
 });

 app.get('/image/:animal', function(req, resp) {
    const animal = req.params.animal;
    console.log(`Animal ${animal}`);
    resp.status(208);
    resp.type('jpg');
    resp.sendfile(req.params.animal);
/*     findUserByUsername(username, function(error, user) {
      if (error) return next(error);
      return response.render('user', user);
    }); */
  });

 
// GET /time -> HTTP
app.get('/time',
    (req, resp, next) => {
        console.log(new Date() + ' Processing time')
        next();
    },
    (req, resp) => {
        //status
        resp.status(201);
        resp.type('text/html');
        resp.send(`<h1>The current time is ${new Date()}</h1>`);
    }
);

// GET /time/json
app.get('time/json', (req, resp) => {
    const data = { 
        "name" : "fred",
        "email": "fred@gmm.com"
    }
    //status
    resp.status(200);
    resp.type('application/json'); //media type
    resp.json({
        time: new Date()
       // people : data
    });
    // resp.send(`<h1>The current time is ${new Date()}</h1>`);
});

// GET / -> HTTP
app.get('/', (req, resp) => {
    const userAgent = req.get('User-Agent');
    //status
    resp.status(200);
    resp.type('text/html');
    resp.send(`<h1>Hello ${userAgent}</h1>`);
});

// GET .* -> HTTP
app.get('*', (req, resp) => {
    const userAgent = req.get('User-Agent');
    //status
    resp.status(208);
    resp.type('text/html');
    resp.send(`<h1>Error MAN</h1>`);
});

//Serves from public

//Step 4: start the server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
}
);