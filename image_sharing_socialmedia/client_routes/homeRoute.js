const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

      compile_user_data = require('../middleware/userdata')

//GET ROUTES

    //sends static files for homepage
      router.get('/', (req, res) => {

            let absolutePath = __dirname.replace(/client_routes/, '') + 'public\\home.html';

            res.sendFile(absolutePath);

      })

      //if the user gets signed out

      router.get('/signedout', (req, res) => {
          res.render('logout')
      })


    //general get request to get all documents in database
      router.get('/users/allpost', async (req, res) => {
                
                await userSchema.find()

                .then ( allUsers => {

                    let allSitesPost = [];

                    for (let i = 0; i < allUsers.length; i++) {

                            allUsers[i].posts.forEach(post => {

                                let tempPost = {};

                                tempPost.username = allUsers[i].username;
                                tempPost.url = post.url;
                                tempPost.caption = post.caption;
                                tempPost.likesNum = post.likes.length;

                                // console.log(`\nUrl:${post.url}\nCaption:${post.caption}\nLikes:${post.likes.length}`);
                                
                                allSitesPost.push(tempPost);
                                
                            });
                    
                    }

                    res.status(200).json({
    
                        message: 'all users posts retrieved',
                        allpost: allSitesPost
    
                    })

                })
                
                .catch ( err => {

                    res.status(500).json({
                        message: 'server error',
                        error: err.message
                    })
                    
                })

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

        // console.log(req.body);
        
          try {

            //get the email and password from the body
            const {email, password} = req.body.data;

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