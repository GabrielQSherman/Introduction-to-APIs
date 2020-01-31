
/* 
1. 
  Allowing this file to access the required packages
  create constant variables needed to interact with the client and server 
*/

require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),

      app = express();

//handling the root route/home route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

//handling request on a specific route
app.get('/api/courses', (req, res) => {
    res.json({courses: [3.14, 7, 42]});
});

//get request for specific course by id
app.get('/api/courses/:id', (req, res) => {
    res.json({courses: req.params.id});
});


//PRACTICE ROUTES
//example query params use case
app.get('/api/query', (req, res) => {

    if (req.query.message == 'true') {

        res.send('You are beautiful');

    } else {

        res.send('no message for you :(');

    }
});

//request a post on a particular month of a particular year
app.get('/api/routeparams/:year/:month', (req, res) => {
    res.json({
        year: req.params.year,
        month: req.params.month
    });
});

//PORT LISTENING
const port = process.env.PORT;

app.listen(port, () => {console.log('Listening on Port:', port);
})