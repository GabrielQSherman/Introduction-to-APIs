
/* 
1. 
  Allowing this file to access the required packages
  create constant variables needed to interact with the client and server 
*/

require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),

      app = express();

//handling the root route/home route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {console.log('Listening on Port 3000');
})