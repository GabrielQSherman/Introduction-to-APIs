const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

      router.get('/:username', (req, res) => {

            let absolutePath = __dirname.replace(/client_routes/, '') + 'public\\profile.html';

            res.sendFile(absolutePath)
      })

      
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