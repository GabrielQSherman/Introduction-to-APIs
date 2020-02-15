const express = require('express'),

      router = express.Router(),
      

      userSchema = require('../models/User');


      router.get('/', (req, res) => {
          res.send('home')
      })

      router.get('/users', async (req, res) => {
          res.send('userpage')
      })

      router.post('/users', async (req, res) => {

            try {

                //compile to new user information in the api, ready to be saved
                const user = new userSchema(req.body)

                //attempt to save the document to the database 
                await user.save();

                const token = await user.generateAuthToken()

                res.status(201).json({
                    document: user,
                    uniqueToken: token

                })

            } catch (err) {

                console.log(err);
                

                res.status(400).json({ 

                    message: err.message,
                    error_report: err
                                
                })
                
            }

      })


      router.post('/users/login', async (req, res) => {
          try {

            const {email, password} = req.body;

            const loginUser = await userSchema.findByCredentials(email, password);

            if (!loginUser) {

                throw new Error('User Not Found') ;
    
            }

            const token = await loginUser.generateAuthToken()

            res.json({
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

// router.post('/users/login', async(req, res) => {
//     //Login a registered user
//     try {
//         const { email, password } = req.body
//         const user = await User.findByCredentials(email, password)
//         if (!user) {
//             return res.status(401).send({error: 'Login failed! Check authentication credentials'})
//         }
//         const token = await user.generateAuthToken()
//         res.send({ user, token })
//     } catch (error) {
//         res.status(400).send(error)
//     }

// })



module.exports = router;