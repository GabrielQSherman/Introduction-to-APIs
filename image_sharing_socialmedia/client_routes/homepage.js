const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

//GET ROUTES

      router.get('/', (req, res) => {
          res.send('home')
      })

      router.get('/users', async (req, res) => {
          res.send('userpage')
      })

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


module.exports = router;