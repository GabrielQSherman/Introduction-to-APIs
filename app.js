require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),
      app = express();

      app.use(express.json());

      

//home page
const homeRoute = require('./routes/home')

app.use('/', homeRoute);


//for the post page
const postRoute = require('./routes/post')

app.use('/post', postRoute)

//set the port to access the site on

const port = process.env.PORT; //get the port number from the env file

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

mongoose.connect(process.env.DB_URI, {useUnifiedTopology:true, useNewUrlParser:true}, 
    () => { 
        console.log('Connected to database');
        
    })