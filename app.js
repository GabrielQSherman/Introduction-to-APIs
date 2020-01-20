const express = require('express'),
      mongoose = require('mongoose'),
      app = express();

app.get('/', (req, res) => {
    res.send('you are home')
})

app.listen(3000);

mongoose.connect()