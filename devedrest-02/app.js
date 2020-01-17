const express = require('express'),

    mongoose = require('mongoose'),

    app = express();

    require('dotenv/config');


    
    //MiddleWare 'seperation of concern' 

    //get the code from the post.js file and use it for the /post route
    postRoute = require('./routes/post');

    app.use('/post', postRoute);

    //uses code in the home.js file and uses the express method use for all calls for the / route
    homeRoute = require('./routes/home');

    app.use('/', homeRoute);


mongoose.connect(
    process.env.DBCONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Connected to Database')
    }
)

const port = process.env.PORT; //get the port number from the env file

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
