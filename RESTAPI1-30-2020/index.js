
/* 
1. 
  Allowing this file to access the required packages
  create constant variables needed to interact with the client and server 
*/

require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),
      config = require('config'),
      Joi = require('joi'),
      helmet = require('helmet'),
      morgan = require('morgan'),
      startupDebuger = require('debug')('app:startup'),
      dbDebuger = require('debug')('app:db'),
      app = express();

//SET TEMPLATING ENGINE
app.set('view engine', 'pug'); //by default templates will be stored in ./views

//CONFIGURATION

//log the name and host of the application
console.log(`Application Name: ${config.get('name')}`);
console.log(`Host Name: ${config.get('mail.host')}`);

     

//2. set middleware used on every request

app.use(express.json()); //json parsing for all request
app.use(express.urlencoded({extended: true})); //allows form data parsing instead of json
app.use(helmet()); //some securing for this express app
app.use(express.static('public')); //allows access to static html files in the /public folder of this directory

if (app.get('env') == 'development') {
    app.use(morgan('tiny')); //logs a short message for every request, this logic allows only developers to get the morgan logging
    startupDebuger('-Morgan enabled-');
    
}

//Database debug
dbDebuger('Connected to database')


//3. set up middleware for specific routes

//handling the root route/home route

//Homepage Router
const homeRouter = require('./routes/home');
app.get('/', homeRouter);

//Courses Router
const coursesRouter = require('./routes/courses');
app.use('/api/courses', coursesRouter);

//Genres Router
const genresRouter = require('./routes/genres');
app.use('/api/genres', genresRouter);


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