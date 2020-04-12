const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth'),

      userdata = require('../middleware/userdata'),

      createId = require('../middleware/idgen');

      
    router.post('/newpost', auth, (req, res) => {

         if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account, new post request therfore can not be made.'
            })
            
        }

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

         if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account, delete post request therfore can not be made.'
            })
            
        }

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

    router.post('/deleteallposts', auth, (req, res) => {

         if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account, delete all posts request therfore can not be made.'
            })
            
        }


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

         if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account.'
            })
            
        }

      let name = req.username,
        
          postNum = req.totalPosts,

          likes = req.totalLikes;

          posts = req.posts;

    //   console.log(name, postNum, likes);

        

      res.render('user', {username: name, totalPosts: postNum, totalLikes: likes, posts: posts});

      // let absolutePath = __dirname.replace(/client_routes/, '') + 'public\\profile.html';

      // res.sendFile(absolutePath)


    })
    

    //Get Request for specific user, needs authenification for sucessful response
    router.get('/getuser', auth, async(req, res) => {

         if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account.'
            })
            
        }

      res.json({ found_user: req.user })

    })


    //LOGGING OUT OF ONE USER

    //one device
    router.post('/logout', auth, async (req, res) => {

        if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account, log out request therfore can not be made.'
            })
            
        }

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

       if (!req.user) {

            res.status(401).json({
                message: 'You are not logged into an account, log out request therfore can not be made.'
            })
            
        }

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

  //update a post's caption

  router.patch('/updatecaption', auth, async(req, res) => {

      try {

          const postId = req.body.id,

                newCaption = req.body.caption;

          let updatedUser = req.user;  
    
             for (let i = 0; i < updatedUser.posts.length; i++) {

                if ( updatedUser.posts[i].id == postId ) {

                    let newpost = updatedUser.posts[i];

                    newpost.caption = newCaption

                    updatedUser.posts.splice(i,1,newpost)

                }
                
            };

            await updatedUser.save();

            res.status(200).json({
                message: 'Caption updated successfully',
                updatedPost: updatedUser
            });
      

      } catch (err) {
          res.status(500).json({
              message: err.message,
              error: err
          })
      }

  })

    router.patch('/:username/likepost', auth, async(req, res) => {

      try {

          const postId = req.body.postId,
                requestUserId = req.user.id,
                userName = req.params.username;

          let postOwner = await userSchema.findOne({ username: userName});

             for (let i = 0; i < postOwner.posts.length; i++) {

                if ( postOwner.posts[i].id == postId && !(postOwner.posts[i].likes.includes(requestUserId))) {

                    let updatedPost = postOwner.posts[i];
                    
                    updatedPost.likes.push(requestUserId)

                    postOwner.posts.splice(i, 1, updatedPost)
                }
                
            };

            await postOwner.save();

            res.status(200).json({
                message: 'Like Request Worked'

            });
      

      } catch (err) {

          console.log(err, err.message);
          

          res.status(500).json({
              message: err.message,
              error: err
          })
      }

  })


  router.patch('/profilecolor/:colorNum', auth, async(req, res) => {

      if (req.params.colorNum >= 0 && req.params.colorNum <= 360) {

          try {

              let updatedUser = req.user, newColor = req.params.colorNum;

              updatedUser.profileColor = newColor;

              updatedUser.save()

              res.status(200).json({
                  message: 'update profile color to ' + newColor
              })
              
          } catch (err) {

              res.status(500).json({

                    message: err.message,
                    error: err
              })
              
          }
          
      } else {

          res.status(401).json({
              message: 'Bad Number Passed, needs to be in range of 0-360'
          })
      }

  })



module.exports = router;