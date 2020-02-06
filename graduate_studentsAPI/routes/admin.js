//packages used for this project
const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

      //this is how this file will interact with the database
      const StudentSchema = require('../models/Student');


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

      //POST REQUEST

      router.post('/post', validateStudent, async (req, res) => {

            try {

                const newPostSaved = await req.newpost.save()
                res.status(200).json({newpost: newPostSaved})

            } catch (err) {

                res.status(500).json({"message": err.message})

            }

      })

      
        //DELETE A POST BY ID

        router.get('/delete/:id', get_by_id, (req, res) => {

            const id = req.searched_document._id;

            console.log(id);

            res.send('testing')
            

            // deleteReport = await StudentSchema.deleteOne({_id: })
        })


      //GET REQUEST FOR ALL GRADUATES IN THE DATABASE

      router.get('/getall', async (req, res) => {

        const allDocuments = await StudentSchema.find();

        console.log('Docs', allDocuments);

        res.json({allDocuments});
          
      })

      //GET REQUEST FOR INDIVUIDUAL DOCUMENTS

      router.get('/getid/:id', get_by_id, (req, res) => {
          res.json({Found_Post: req.searched_document})
      })

//MIDDLEWARE FUNCTIONS FOR REQUEST

//need to add hapijoi to validate the student schema better
function validateStudent(req, res, next) {

    console.log(req.body);
    
    const newGraduate = StudentSchema({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gradYear: req.body.gradYear,
        gradMonth: req.body.gradMonth,
        job_Title: req.body.job_Title,
        company_Name: req.body.company_Name,
        key_Skills: req.body.key_Skills,
        gitHub: req.body.gitHub,
        linkedIn: req.body.linkedIn,
        twitter: req.body.twitter,
        linkedInIMG: req.body.linkedInIMG,

    })

    req.newpost = newGraduate;

    next()

}

//middleware used for all request that require a unique id, delete one post, find one post, update one post
async function get_by_id(req, res, next) {

    try {

        const searchedDoc = await StudentSchema.findById(req.params.id);

        if (searchedDoc === null) {
            throw new Error('ID is in the correct format, but no document with this id could be found')
        }

        req.searched_document = searchedDoc;
        
        next()
        
    } catch (err) {

        let statusCode = 404;

        if ( err.message.substring(0,4) == 'Cast') {

           err.message = 'ID is not in the correct format';

           statusCode = 400;

        }

        res.status(statusCode).json({
            message: 'Invalid Id',
            error: err.message
        })
        
    }

}


//PASSWORD LOCKING THE ADMIN ROUTE (in progress)
      //checks for password to have been correct at least one time

       //passwords could be stored in admin enviorment files that store passwords. 
      //this password will be 34567 for an example

    //   let indexPassword = process.env.ADMINPASSWORD || 321,
    //       adminPrivleges = false;

    //   router.get('/admin/:key', (req, res) => {

    //     if (req.params.key == indexPassword || adminPrivleges == true){
            
    //         app.use('/admin', adminRoute);

    //         res.send('You can use the admin Route');

    //         adminPrivleges = true

    //     } else {

    //         console.log('access denied');

    //         res.send('An incorrect key was given, access denied');

    //     }

            
    //   })

//export all the functions to the index.js file
    module.exports = router;