const express = require('express'),
      router = express.Router(),
    //   mongoose = require('mongoose'),

      StudentSchema = require('../models/Student');

    //HOMEPAGE
      router.get('/', (req, res) => {

        let absolutePath = __dirname.replace('\\routes', '') + '\\public\\public.html';

        res.sendFile(absolutePath)

      });

      //FIND BY ID
      router.get('/find/graduateid/:id', async (req, res) => {

        try {

            foundGraduate = await StudentSchema.find({_id: req.params.id});

            res.status(200).json(foundGraduate)
            
        } catch (err) {

            res.status(500).json({message: err});

        }

      })

      //FILTER ALL DOCUMENTS (GET)

      router.get('/filter/:filter/:value', async (req, res) => {

          let filter = req.params.filter,
              value = req.params.value,

              searchObj = {};

              searchObj[filter] = value;

              console.log(`fitler by: ${filter}, search for value: ${value}, what is insterted into .find method: ${searchObj}`);                

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
                  error: err.message,
                  status: 401
              })
          })

      })

      //REQUEST ALL
      router.get('/find/all', async (req, res) => {

        try {

            allGrads = await StudentSchema.find();

            res.status(200).json(allGrads)
            
        } catch (err) {

            res.status(500).json({message: err});

        }

      })


 

module.exports = router;