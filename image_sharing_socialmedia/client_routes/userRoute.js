const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

      
    router.post('/newpost', auth, (req, res) => {

      newpost = {

            url: req.body.url,

            caption: req.body.caption,

            likes: []
                                             
      }


      try {
           

            updatedUser = req.user;

            updatedUser.posts.push(newpost);

            console.log(updatedUser);

            updatedUser.save();

            res.send(updatedUser);

      }

       catch( err ) {

           console.log(err);
           
       }

    })


module.exports = router;