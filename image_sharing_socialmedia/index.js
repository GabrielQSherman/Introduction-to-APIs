//variables needed to run server
require('dotenv/config')

// const cors = require('cors');

const express = require('express'),
      mongoose = require('mongoose'),
      helmet = require('helmet'),
      morgan = require('morgan'),

      app = express(); //instance of express (aka an express application)

//Middleware thats used for every request

app.set('view engine', 'pug');

// app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'));

const homeRouter = require('./client_routes/homeRoute');

app.use('/', homeRouter);


const userRouter = require('./client_routes/userRoute');

app.use('/user', userRouter)

///////////////////////////////////////////////////////////////////////////////////////////// CONNECTING TO DATABASE 
//Connect to my MongoDB account

//get the database connection uri from my .env file
let mongoUri = process.env.MOGO_URI;

//connnect using the previously declared variable and use obj to pass through parameters so no depercation warnings occur
mongoose.connect(mongoUri, ({ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ))

//when the connection occurs these promises will fire
mongoose.connection.on('connected', () => {

    // console.log(`\nMongoose connection open to ${mongoUri}\n`);

});

//if an error occurs, the a message will be logged
mongoose.connection.on('error', (err) => { 

    console.log(`Mongoose connection error: ${err}`);

}); 

//this will fire once the database has successfully made a connection
mongoose.connection.once('open', () => {

    console.log("\nDatabase Connected\n");

})

//if the DB disconnects a message will be logged
mongoose.connection.on('disconnected', () => { 

    console.log('\nMongoose default connection disconnected'); 

});

///////////////////////////////////////////////////////////////////////////////////////////// CONNECTING TO LOCALHOST
//Connect to the local host to run the server durring development
let port = process.env.PORT || 3000;

app.listen(port, () => {
    
    console.log(`\nServer listening on Port ${port}`);
    
})