const express = require('express'),
      mongoose = require('mongoose'),
      app = express();

//home page
const homeRoute = require('./routes/home')

app.use('/', homeRoute);


//for the post page
const postRoute = require('./routes/post')

app.use('/', postRoute)

//set the port to access the site on
app.listen(3000);

// mongoose.connect()