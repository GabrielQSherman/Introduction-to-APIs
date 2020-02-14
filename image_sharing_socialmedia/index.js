//variables needed to run server



const express = require('express'),
      mongoose = require('mongoose'),

      app = express(); //instance of express (aka an express application)


      let port = 3000;

app.listen(port, () => {
    console.log(`Server listening on Port ${port}`);
    
})