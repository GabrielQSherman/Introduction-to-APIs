const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth'),

      userdata = require('../middleware/userdata'),

      createId = require('../middleware/idgen');

      
    router.post('/newpost', auth, (req, res) => {

        // console.log(req.body);

      let newPostId = createId(33, 77, 48);

    //   console.log(newPostId);
      
      newpost = {

            url: req.body.url,

            caption: req.body.caption,

            likes: [],

            id: newPostId
                                             
      }

      try {
           

            updatedUser = req.user;

            updatedUser.posts.push(newpost);

            // console.log(updatedUser);

            updatedUser.save();

            res.status(200).json({post: newpost});

      }

       catch( err ) {

           console.log(err);
           
       }

    })

    //delete a users post
    router.post('/deletepost', auth, (req, res) => {

       const postId = req.body.id

        try {

            let updatedUser = req.user,
                deletedPost;
           
            for(let i = 0; i < updatedUser.posts.length; i++) {

                if ( updatedUser.posts[i].id == postId ) {

                    deletedPost = updatedUser.posts.splice(i, 1);
                    
                }
                
            };

            updatedUser.save();

            res.status(200).json({
                message: 'One post removed from user profile',
                postDeleted: deletedPost[0]
            });

        }

        catch( err ) {

            console.log(err);
            
        }

    })

    router.post('/deleteallpost', auth, (req, res) => {


         try {
           
            let updatedUser = req.user;

                updatedUser.posts = [];

                updatedUser.save();

                res.status(200).json({message: 'All post removed from user profile'});

        }

        catch( err ) {

            console.log(err);
            
        }
        
    })

    router.get('/profile', auth, userdata, (req, res) => {


      let name = req.username,
        
          postNum = req.totalPosts,

          likes = req.totalLikes;

          posts = req.posts;

    //   console.log(name, postNum, likes);

        

      res.render('user', {username: name, totalPosts: postNum, totalLikes: likes, posts: posts});

      // let absolutePath = __dirname.replace(/client_routes/, '') + 'public\\profile.html';

      // res.sendFile(absolutePath)


    })

    router.get('/page', auth, (req, res) => {


        let user = req.user;
  
        console.log(user);
  
        res.render('user', {username: 'asdf'});
  
        // let absolutePath = __dirname.replace(/client_routes/, '') + 'public\\profile.html';
  
        // res.sendFile(absolutePath)
  
  
    })
    

    //Get Request for specific user, needs authenification for sucessful response
    router.get('/getuser', auth, async(req, res) => {

      res.json({ found_user: req.user })

    })


    //LOGGING OUT OF ONE USER

    //one device
    router.post('/logout', auth, async (req, res) => {

      try {
          req.user.tokens = req.user.tokens.filter((databaseStoredToken) => {

              //this filter method will only leave remaining the tokens that were not just used in the 'auth' middleware
              return databaseStoredToken.token != req.token
          
          })

          await req.user.save() //save the document, now without the token just used
          res.json({
              message: 'You are logged out from this device'
          })

      } catch (err) {

          res.status(500).json({
              message: err.message,
              error_report: err
          })
          
      }
  })

  //all devices currently logged in
  router.post('/logoutall', auth, async(req, res) => {
      try {

      //     console.log(req.user.tokens);
          

          req.user.tokens = []; //just clears the token array in the database

          await req.user.save() //save the document with no tokens in the token array

          res.json({
              message: 'You are no longer logged in on any device'
          })

      } catch (err) {
          res.status(500).json({
              message: err.message,
              error: err
          })
      }
  })



module.exports = router;