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

    router.get('user/profile', auth, (req, res) => {


      res.render('user', {username: 'asdf'});

      // let absolutePath = __dirname.replace(/client_routes/, '') + 'public\\profile.html';

      // res.sendFile(absolutePath)

      
    })
    

    //Get Request for specific user, needs authenification for sucessful response
    router.get('/users/getuser', auth, async(req, res) => {

      res.json({ found_user: req.user })

    })


module.exports = router;