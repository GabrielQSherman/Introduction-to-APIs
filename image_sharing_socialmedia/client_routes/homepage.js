const express = require('express'),

      router = express.Router(),
      

      userSchema = require('../models/User');


      router.get('/', (req, res) => {
          res.send('home')
      })



module.exports = router;