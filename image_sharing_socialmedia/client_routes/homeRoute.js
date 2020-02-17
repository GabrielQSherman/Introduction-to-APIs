const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

//GET ROUTES

      router.get('/', (req, res) => {

            let absolutePath = __dirname.replace(/client_routes/, '') + 'frontend\\home.html';

            res.sendFile(absolutePath);

      })

//general get request to get all documents in database
      router.get('/users', async (req, res) => {
                
                await userSchema.find()

                .then ( allUsers => {

                    res.status(200).json({
    
                        message: 'all users retrieved',
                        document: allUsers
    
                    })

                })
                
                .catch ( err => {

                    res.status(500).json({
                        message: 'server error',
                        error: err.message
                    })
                    
                })

      })


//Get Request for specific user, needs authenification for sucessful response
      router.get('/users/getuser', auth, async(req, res) => {

        res.json({ found_user: req.user })

      })

//CREATING A NEW USER
      router.post('/users', async (req, res) => {

            try {

                //compile to new user information in the api, ready to be saved
                const user = new userSchema(req.body)

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
      router.post('/users/login', async (req, res) => {
          try {

            //get the email and passwor from the body
            const {email, password} = req.body;

            //call the credential check method defined in the model file
            const loginUser = await userSchema.findByCredentials(email, password);

            //if a user is returned then a new jw token will be generated, otherwise the client has passed a non existant user
            if (!loginUser) {

                throw new Error('User Not Found') ;
    
            }

            //create a new jw-token
            const token = await loginUser.generateAuthToken()

            //response is successful
            res.status(200).json({
                document: loginUser,
                new_token: token
            })
              
          } catch (err) {

            res.status(400).json({

                message: err.message,
                errorReport: err

            })
              
          }
      })

//LOGGING OUT OF ONE USER

    //one device
    router.post('/users/logout', auth, async (req, res) => {

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
    router.post('/users/logoutall', auth, async(req, res) => {
        try {

            console.log(req.user.tokens);
            

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