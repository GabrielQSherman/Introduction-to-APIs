const express = require('express'),
      router = express.Router(),
      Joi = require('joi');


    const courses = [{id:1, name: "intro"},
    {id:2, name: "interm"},
    {id:3, name: "adv"}];



//handling get all request on /api/courses
router.get('/', (req, res) => {
    res.json({courses});
});

//get request for specific course by id on /api/courses
router.get(':id', (req, res) => {
    const searchedCourse = courses.find(c => c.id === parseInt(req.params.id));

    if (!searchedCourse) return res.status(404).send('That course could not be found');


    res.status(200).send(searchedCourse);

});

//POST HANDLING on /api/courses
router.post('/', (req, res) => {

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
router.put('/:id', (req, res) => {

    const searchedCourse = courses.find(c => c.id === parseInt(req.params.id));

    if (!searchedCourse) return res.status(404).send('That course could not be found');

    const { error } = validate_course(req.body);
    
    if (error) return res.status(400).json({ message: error });

    //now that the potential erros have been handled, update the data
    searchedCourse.name = req.body.name;

    res.send(searchedCourse);

})

//DELETE REQUEST on /api/courses
router.delete('/:id', (req, res) => {
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


module.exports = router;