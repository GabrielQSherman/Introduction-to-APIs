//Gabriel Sherman 2/5/2020 
//Student graduation 

//This file will handle routes and send information to my MongoDB collections. 

//it is recommened that your enviorment variables are 'imported' first
require('dotenv/config');

//then the rest of the packages can be called into scope of this file
const express = require('express'),

      mongoose = require('mongoose'), //the program interacts with Mongo DataBases with this package

      morgan = require('morgan'), //this logs request conveinently for testing and development

      app = express(); //this is an instance of express

      //middleware uses for all routes called through the localhost at port found in the enviorment file. or 3000 as a fallback

      app.use(morgan('tiny')); //displays a short console message that includes the method type that was use such as 'GET' or 'POST'. also the time and status code are displayed
      
      app.use(express.json()); //allows json object data

      app.use(express.urlencoded({extended: true})); //allows form data 

      let databaseConnected = false;

      //middleware uses for other routes will be below here

      //route for the homepage (root route), aka what the public sees
      const homeRoute = require('./routes/home');

      app.use('/', data_base_condition, homeRoute) //this will be the root-route or homepage

      //ADMIN ROUTE -has acces to make changes to database

      const adminRoute = require('./routes/admin');

      app.use('/admin', data_base_condition, adminRoute)

      //this connects to my mongodb, it get my password from my hidden enviorment or 'dot e.n.v.' file. 
    
      const mongopass = process.env.MONGOPASS,
            
            uri = `mongodb+srv://user314:${mongopass}@cluster0-ichxa.mongodb.net/graduate_students?retryWrites=true&w=majority`;

            mongoose.connect(uri, ({ useNewUrlParser: true, useUnifiedTopology: true } ));

            let db = mongoose.connection;
                db.on('error', console.error.bind(console, 'connection error:'));
                db.once('open', function callback () {

                console.log("\nDatabase Connected\n");

                databaseConnected = true;

                });

      const port = process.env.PORT;

      app.listen(port, () => {
          console.log('Listening on port:', port);
          
      });

      function data_base_condition(req, res, next) {
          
            if (databaseConnected === true) {
                
                next()

            } else {

                res.status(500).json({
                    message: "Server not connected to database, please try again in a moment"
                })
            }
      }


//parameters that change the look of the site and logs dependening on client_type and who is developing on the project, 
      
