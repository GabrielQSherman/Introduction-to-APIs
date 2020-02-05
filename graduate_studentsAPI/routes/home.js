const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

      router.get('/', (req, res) => {

            res.status(200).json({message: "You are home"});
            
      })



module.exports = router;