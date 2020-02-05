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

      app.get('/', homeRoute) //this will be the root-route or homepage

      //passwords could be stored in admin enviorment files that store passwords. 
      //this password will be 34567 for an example

      let indexPassword = process.env.ADMINPASSWORD || 34567;

      app.get('/admin/:key', (req, res) => {

        if (req.params.key == indexPassword){
            console.log('unlocked');
            
        } else {
            console.log('access denied');

            res.send('An incorrect key was given, access denied')
        }

            
      })

      //this connects to my mongodb, it get my password from my hidden enviorment or 'dot e.n.v.' file. 
    
      const mongopass = process.env.MONGOPASS,
            
      uri = `mongodb+srv://user314:${mongopass}@cluster0-ichxa.mongodb.net/test?retryWrites=true&w=majority`;

      const MongoClient = require('mongodb').MongoClient;

      const client = new MongoClient(uri, { useUnifiedTopology: true , useNewUrlParser: true });
      
      client.connect()
        client.on('error', console.error.bind(console, 'connection error:'));
        client.once('open', function callback () {
        console.log("Database Connected");
        });

      const port = process.env.PORT;

      app.listen(port, () => {
          console.log('Listening on port:', port);
          
      })

//parameters that change the look of the site and logs dependening on client_type and who is developing on the project, 
      
