
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

const courses = [{id:1, name: "intro"},
               {id:2, name: "interm"},
               {id:3, name: "adv"}];

//3. set up middleware for specific routes

//handling the root route/home route
app.get('/', (req, res) => {
    res.render('index', {title: "Homepage", message: "You are on the homepage"})
});

//handling get all request on /api/courses
app.get('/api/courses', (req, res) => {
    res.json({courses});
});

//get request for specific course by id on /api/courses
app.get('/api/courses/:id', (req, res) => {
    const searchedCourse = courses.find(c => c.id === parseInt(req.params.id));

    if (!searchedCourse) return res.status(404).send('That course could not be found');


    res.status(200).send(searchedCourse);

});

//POST HANDLING on /api/courses
app.post('/api/courses', (req, res) => {

    const { error } = validate_course(req.body);
    
    if (error) return res.status(400).json({ message: error });

    const newCourse = {
        id: courses.length+1,
        name: req.body.name
    }

    courses.push(newCourse);

    res.status(200).json({newCourse: newCourse})

});

//PUT update a post on /api/courses
app.put('/api/courses/:id', (req, res) => {

    const searchedCourse = courses.find(c => c.id === parseInt(req.params.id));

    if (!searchedCourse) return res.status(404).send('That course could not be found');

    const { error } = validate_course(req.body);
    
    if (error) return res.status(400).json({ message: error });

    //now that the potential erros have been handled, update the data
    searchedCourse.name = req.body.name;

    res.send(searchedCourse);

})

//DELETE REQUEST on /api/courses
app.delete('/api/courses/:id', (req, res) => {
    const searchedCourse = courses.find(c => c.id === parseInt(req.params.id));

    if (!searchedCourse) return res.status(404).send('That course could not be found');

    //now that the potential erros have been handled, delete the desired data
    courses.splice(courses.indexOf(searchedCourse), 1);

    res.send(searchedCourse);

})


//validation middleware for /api/courses
function validate_course(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}


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