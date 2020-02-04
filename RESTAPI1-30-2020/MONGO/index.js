const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testing') //this creates a promise
    .then(() => console.log('Connected to Database')) //if everything goes well
    .catch( err => console.log('Could not connect to database...', err)) //if not give an error to the log
    
    const courseSchema = mongoose.Schema({ 
        //this is model's 'object' constructor function it will set the blueprint for the objects that will be stored in the database
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now},
        isPublished: { type: Boolean, default: false}
    });

    const Course = mongoose.model('Course', courseSchema); //having a mongoose model allows the program to create intances of the schema and this will be what gets called upon to find data in a partiucular portion of the database

    const gabe_course = new Course({
        name: 'Gabes Photography Course 1',
        author: 'Gabriel Sherman',
        tags: ['intro', 'photos101'],
    })

    console.log(gabe_course);
    