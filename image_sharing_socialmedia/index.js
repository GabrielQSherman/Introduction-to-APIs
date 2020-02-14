//variables needed to run server
require('dotenv/config')

const express = require('express'),
      mongoose = require('mongoose'),

      app = express(); //instance of express (aka an express application)

///////////////////////////////////////////////////////////////////////////////////////////// CONNECTING TO DATABASE 
//Connect to my MongoDB account

//get the database connection uri from my .env file
let mongoUri = process.env.MOGO_URI;

//connnect using the previously declared variable and use obj to pass through parameters so no depercation warnings occur
mongoose.connect(mongoUri, ({ useNewUrlParser: true, useUnifiedTopology: true } ))

//when the connection occurs these promises will fire
mongoose.connection.on('connected', () => {

    console.log(`\nMongoose connection open to ${mongoUri}\n`);

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