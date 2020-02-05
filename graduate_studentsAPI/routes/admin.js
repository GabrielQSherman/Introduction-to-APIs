//packages used for this project
const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

      //this is how this file will interact with the database
      const StudentSchema = require('../models/students');

      //checks for password to have been correct at least one time

       //passwords could be stored in admin enviorment files that store passwords. 
      //this password will be 34567 for an example

      let indexPassword = process.env.ADMINPASSWORD || 321,
          adminPrivleges = false;

      router.get('/admin/:key', (req, res) => {

        if (req.params.key == indexPassword || adminPrivleges == true){
            
            app.use('/admin', adminRoute);

            res.send('You can use the admin Route');

            adminPrivleges = true

        } else {

            console.log('access denied');

            res.send('An incorrect key was given, access denied');

        }

            
      })


    //sets up the admin page as options, served as json
    let firstTimeRan = true, 
        firstMessage = {
            message: "You have been granted access to the administrator route",
            hint: "Refresh the page to see options as an administrator"
        },
        optionsMessage = {
            message: "You have options to change what is in the database.",
            POST: "route to use: admin/post",
            GET: "route to use: admin/getall or admin/getid/:id",
            DELETE: "route to use: admin/delete/:id",
            PATCH: "route to use: admin/patch/id"
        }

        //the /admin route will be for showing the options of what the admin can do
        router.get('/', (req, res) => {

        if (firstTimeRan) {

            res.status(200).json(firstMessage);

            firstTimeRan = false
            
        } else {
            
            res.status(200).json(optionsMessage);

        }
            
      })

      async function display_all_grads(req, res, next) {

        const allDocuments = await StudentSchema.find();

        console.log('Docs', allDocuments);

      }


module.exports = router;