const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

    let firstTimeRan = true, 
        firstMessage = {
            message: "You have been granted access to the administrator route",
            hint: "Refresh the page to see options as an administrator"
        },
        optionsMessage = {
            message: "You have options to change what is in the database."
        }

      router.get('/', (req, res) => {

        if (firstTimeRan) {

            res.status(200).json(firstMessage);

            firstTimeRan = false
            
        } else {
            
            res.status(200).json(optionsMessage);

        }

            
            
      })



module.exports = router;