
/* 
1. 
  Allowing this file to access the required packages
  create constant variables needed to interact with the client and server 
*/

require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),
      Joi = require('joi');

      app = express();

//json parsing for all request
app.use(express.json());


const courses = [{id:1, course: "intro"},
               {id:2, course: "interm"},
               {id:3, course: "adv"}];

//handling the root route/home route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

//handling request on a specific route
app.get('/api/courses', (req, res) => {
    res.json({courses});
});

//get request for specific course by id
app.get('/api/courses/:id', (req, res) => {
    const searchedCourse = courses.find(c => c.id === parseInt(req.params.id));

    if (searchedCourse) {
        res.status(200).send(searchedCourse);
    } else {
        res.status(404).send('That course could not be found');
    }

});

//POST HANDLING
app.post('/api/courses', (req, res) => {

    const PostSchema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, PostSchema);

    

    if (req.body.name.length < 4) {
        res.status(400).send('The name of the course must be at least 3 characters');
    }

    const newCourse = {
        id: courses.length+1,
        name: req.body.name
    }

    courses.push(newCourse);

    res.status(200).json({newCourse: newCourse})

})


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