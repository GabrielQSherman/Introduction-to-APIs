const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testing') //this creates a promise
    .then(() => console.log('Connected to Database')) //if everything goes well
    .catch( err => console.log('Could not connect to database...', err)) //if not give an error to the log
    
