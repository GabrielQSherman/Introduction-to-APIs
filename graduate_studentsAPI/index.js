//This file will handle routes and send information to my MongoDB collections. 

const express = require('express'),

      mogoose = require('mongoose'),

      morgan = require('morgan'),

      app = express();

      app.get('/', (req, res) => {
          res.send('home')
      })



      app.listen(3000, () => {
          console.log('Listening on port 3000');
          
      })


      
