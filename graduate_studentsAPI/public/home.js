const express = require('express'),
      router = express.Router(),
    //   mongoose = require('mongoose'),

      StudentSchema = require('../models/Student');

      port = process.env.PORT;

      
    //HOMEPAGE
      router.get('/', (req, res) => {

        let absolutePath = __dirname + '\\home.html';

        // console.log(absolutePath);

        res.sendFile(absolutePath)

      });

    //   //FIND BY ID
    //   router.get('/find/graduateid/:id', async (req, res) => {

    //     try {

    //         foundGraduate = await StudentSchema.find({_id: req.params.id});

    //         res.status(200).json(foundGraduate)
            
    //     } catch (err) {

    //         res.status(500).json({message: err});

    //     }

    //   })

    //   //REQUEST ALL
    //   router.get('/find/all', async (req, res) => {

    //     try {

    //         allGrads = await StudentSchema.find();

    //         res.status(200).json(allGrads)
            
    //     } catch (err) {

    //         res.status(500).json({message: err});

    //     }

    //   })


    // document.getElementById('get_all').addEventListener('onclick', (get_all_graduates));

    // document.getElementById('get_individual').addEventListener('onclick', (get_individual_graduates));

    // document.getElementById('get_recent').addEventListener('onclick', (get_recent_graduates));

    get_all_graduates()

   async function get_all_graduates() {

        try {

            allGrads = await StudentSchema.find();
            
            for (let i = 0; i < allGrads.length; i++) {
            
              console.log(allGrads[i]);
              
           }

          console.log('successful');
            
        } catch (err) {

            console.log(err);
            

        }


        // document.getElementById('graduate_layout').appendChild()
        
}

   async function get_individual_graduates() {
        
    }

   async function get_recent_graduates() {
        
    }

module.exports = router;