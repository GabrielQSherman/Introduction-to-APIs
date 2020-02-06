const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),

      StudentSchema = require('../models/Student');

      port = process.env.PORT;

      

      router.get('/', (req, res) => {

            res.status(200).json({
                message: "You are home",
                options: `go to the http://localhost:${port}/find/all to see all graduates`
            });
            
      });

      //all the post can be found individualy by id
      router.get('/find/graduateid/:id', (req, res) => {



      })

      //all the post in the database
      router.get('/find/all', async (req, res) => {

        try {

            allGrads = await StudentSchema.find();

            res.status(200).json(allGrads)
            
        } catch (err) {

            res.status(500).json({message: err});

        }

      })

      //



module.exports = router;