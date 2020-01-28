//loads enviorment variables for server.js to use
require('dotenv/config');

const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),

      //all the route handling for the post page will be stored inside the postRouter variable, which is defined and then exported in the post.js file 
      postRouter = require('./routes/post');

//Middleware

//for all routes; we are using json objects to format the body for request. so if we want to send data to the the mongo data base it will take a json object as input
app.use(express.json);

//MW for post route
//if the user enters the /post route, then the postrouter variable will be called upon to handle http request
app.use('/post', postRouter);

app.get('/', (req, res) => {
    
    res.json({message: "hello, this is the home page"});
});

const myMongoDBId = process.env.DB_ID;


mongoose.connect(myMongoDBId, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoDBConnection = mongoose.connection;

mongoDBConnection.on('error', (error) => console.error(error));
mongoDBConnection.once('open', () => console.log('Connected to Database'));

app.listen(3000, () => console.log('Server listening\nMDB ID: ', process.env.DB_ID));