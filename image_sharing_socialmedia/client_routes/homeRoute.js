const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

      compile_user_data = require('../middleware/userdata')

//GET ROUTES

    //render html pages via templating engine

    
      router.get('/', (req, res) => {
          res.render('home');
      })

      router.get('/signin', (req, res) => {
          res.render('signin');
      })

      router.get('/signup', (req, res) => {
          res.render('signup');
      })

      router.get('/signedout', (req, res) => {
          res.render('logout');
      })


   

//view a users post, bring client to homepage if they have no post or the user doesnt exist
    router.get('/:username', async (req, res) => {

        try {

             let userName = req.params.username;

            await userSchema.find({username: userName})

            .then( foundUser => {

                console.log(foundUser);
                

                if (foundUser.length == 0) {

                    res.status(404).json({
                        message: `No user with the username ${userName} exist`
                    })
                    
                } else if ( foundUser[0].posts.length == 0 ) {

                     res.status(200).json({
                        un: userName,
                        message: `The user ${userName} does not have any post to view`
                    })

                } else if ( foundUser[0].posts.length > 0 )  {

                    let allPost = foundUser[0].posts;

                     res.render('pubpro', {username: userName, totalPosts: allPost.length, totalLikes: 10, posts: allPost});

                }

            })
            
        } catch (error) {

             res.status(200).json({

                // message: `${userPost.length} post by ${userName} were found`,
                posts: foundUser[0].posts.length,
                username: userName

            })
            
        }

    })

//search for a user by username on homepage

    router.get('/getuserbyname/:username', async (req, res) => {


        try {

            let userName = req.params.username;

            await userSchema.find({username: userName})

            .then( foundUser => {

                console.log(foundUser);
                

                if (foundUser.length == 0) {

                    res.status(404).json({
                        message: `No user with the username ${userName} exist`
                    })
                    
                } else if ( foundUser[0].posts.length == 0 ) {

                     res.status(200).json({
                        username: userName,
                        message: `The user ${userName} does not have any post to view`
                    })

                } else {

                    res.status(200).json({
                        // message: `${userPost.length} post by ${userName} were found`,
                        posts: foundUser[0].posts.length,
                        username: userName
                    })

                }

            })
            

        } catch (err) {

            res.status(500).json({
                error: err,
                message: err.message
            })
            
        }

    })



//CREATING A NEW USER
      router.post('/users', async (req, res) => {

        console.log(req.body);

        const newUserInfo = req.body;
        

            try {

                //compile to new user information in the api, ready to be saved
                const user = new userSchema(newUserInfo)

                //attempt to save the document to the database 
                await user.save();

                //generate the first jwt that will be stored in the database
                const token = await user.generateAuthToken()

                res.status(201).json({
                    document: user,
                    uniqueToken: token

                })

            } catch (err) {

                // console.log(err);

                res.status(400).json({ 

                    message: err.message,
                    error_report: err
                                
                })
                
            }

      })

//LOGGING IN
      router.post('/login', async (req, res) => {

        console.log(req.body);
        
          try {

            //get the email and password from the body
            const {email, password} = req.body;

            //call the credential check method defined in the model file
            const loginUser = await userSchema.findByCredentials(email, password);

            //if a user is returned then a new jw token will be generated, otherwise the client has passed a non existant user
            if (!loginUser) {

                throw new Error('User Not Found') ;
    
            }

            //create a new jw-token
            const token = await loginUser.generateAuthToken()

            // response is successful
            res.status(200).json({
                token: token

            })

          } catch (err) {

            console.log(err);
            console.log('\n\n\n', err.message);

            let status;

                if (err.message == 'Invalid Password' || err.message == 'Email Not Found') {

                    status = 271;

                } else {

                    status = 500;
                    
                }

             res.status(status).json({

                message: err.message

             })
              
          }

      })





module.exports = router;

//test routes

 //general get request to get all documents in database
    //   router.get('/users/allpost', async (req, res) => {
                
    //             await userSchema.find()

    //             .then ( allUsers => {

    //                 let allSitesPost = [];

    //                 for (let i = 0; i < allUsers.length; i++) {

    //                         allUsers[i].posts.forEach(post => {

    //                             let tempPost = {};

    //                             tempPost.username = allUsers[i].username;
    //                             tempPost.url = post.url;
    //                             tempPost.caption = post.caption;
    //                             tempPost.likesNum = post.likes.length;

    //                             // console.log(`\nUrl:${post.url}\nCaption:${post.caption}\nLikes:${post.likes.length}`);
                                
    //                             allSitesPost.push(tempPost);
                                
    //                         });
                    
    //                 }

    //                 res.status(200).json({
    
    //                     message: 'all users posts retrieved',
    //                     allpost: allSitesPost
    
    //                 })

    //             })
                
    //             .catch ( err => {

    //                 res.status(500).json({
    //                     message: 'server error',
    //                     error: err.message
    //                 })
                    
    //             })

    //   })