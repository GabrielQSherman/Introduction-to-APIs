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