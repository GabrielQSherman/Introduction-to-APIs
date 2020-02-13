//packages used for this project
const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

        //this is how this file will interact with the database
        const StudentSchema = require('../models/Student');

        //the /admin route will be for showing the options of what the admin can do
        router.get('/', (req, res) => {

            let absolutePath = __dirname.replace('\\routes', '') + '\\database_frontend\\admin.html';

            res.sendFile(absolutePath)
                
        })

        //FILTERED SEARCH REQUEST

        router.get('/:filter/:value', async (req, res) => {

            let filter = req.params.filter,
                value = req.params.value,

                searchObj = {};

                searchObj[filter] = value;

                // console.log(`fitler by: ${filter}, search for value: ${value}, what is insterted into .find method: ${searchObj}`);                

            await StudentSchema.find(searchObj)

            .then( (response) => {

                if (response.length === 0) {

                    throw new Error('There were no post that match this request')
                    
                }

                res.status(200).json({
                    message: 'post were found',
                    document: response,
                    status: 200
                })
            })

            .catch( err => {
                res.status(401).json({
                    message: 'Unsuccessful Search Request',
                    error: err.message.toString(),
                    status: 401
                })
            })

            


        })

        //POST REQUEST

        router.post('/', compile_student_doc, async (req, res) => {

                try {

                    const newPostSaved = await req.newpost.save()

                    res.status(200).send({document: newPostSaved, status: 200})
          
                } catch (err) {

                    console.log(err.message);
                    
                    res.status(500).json({"message": err.message, status: 500})

                }

        })

      
        //DELETE A POST BY ID

        router.delete('/:id', get_by_id, async (req, res) => {


            try {

                deleteReport = await StudentSchema.deleteOne({_id: req.id});

                res.status(200).json({
                    message: "Item successfuly deleted from database",
                    document: req.searched_document,
                    status: 200
                })
                
            } catch (err) {

                res.status(400).json({
                    message: "Item could not be deleted from database",
                    status: 400
                })

                console.log(err);
                
            }

            // console.log('\number of items deleted from database: ', deleteReport.deletedCount);
        
        })


        //PUT A SINGLE POST

        router.put('/:id', get_by_id, async (req, res) => {

            try {

                req.body.lastUpdated = Date(Date.now()).toString().substr(4,11);

                const updatedDocument = await StudentSchema.updateOne({_id: req.id}, req.body);

                res.status(200).json({ 

                    document: await StudentSchema.findById(req.id), 
                    // changes: req.body,
                    message: "the post was updated successfully", 
                    status: 200

                });
                
            } catch (err) {

                console.log(err);

                res.status(500).json({

                    message: 'The server was unable to update the document',
                    status: 500,
                    error: 'Api did not function properly'
                })
                
            }

        
        })


      //GET REQUEST FOR ALL GRADUATES IN THE DATABASE

      router.get('/getall', async (req, res) => {

        const allDocuments = await StudentSchema.find();

        // console.log('Docs', allDocuments); //logs all documents in database to the request of this router method

        res.status(200).json({All_Documents_in_DB: allDocuments, status: 200});
          
      })

      //GET REQUEST FOR INDIVUIDUAL DOCUMENTS

      router.get('/getid/:id', get_by_id, (req, res) => {
          res.status(200).json({
              document: req.searched_document,
              status: 200,
              message: 'Post sucessfully retreived from database'
          })
      })



//MIDDLEWARE FUNCTIONS FOR REQUEST

function compile_student_doc(req, res, next) {

    // console.log(req.body);
    
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

//middleware used for all request that require a unique id, delete one post, find one post, put/update one document

// tries to find a document in the students database and if it can not find it, the appropriate error will be thrown
async function get_by_id(req, res, next) {

    try {

        const searchedDoc = await StudentSchema.findById(req.params.id);

        if (searchedDoc === null) {
            throw new Error('ID is in the correct format, but no document with this id could be found')
        }

        req.searched_document = searchedDoc;

        req.id = req.searched_document._id;
            
        next()
        
    } catch (err) {

        let statusCode = 401;

        if ( err.message.substring(0,4) == 'Cast') {

           err.message = 'ID is not in the correct format';

           statusCode = 400;

        }

        res.status(statusCode).json({
            message: 'Invalid Id, this id was not connected to any document in the database',
            error: err.message,
            status: statusCode
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