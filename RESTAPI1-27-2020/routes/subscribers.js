const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();

//importing schema

const subscriberSchema = require('../models/Sub');

      //Routes to create...

      //1. get all subs
      router.get('/', async (req, res) => {

        try {

            const allSubs = await subscriberSchema.find();      

            res.json(allSubs);

        } catch (err) {

            res.status(500).json({message: err.message}); //status 500 indicated serverside error
        }
        
      });

      //2. create a sub
      router.post('/', async (req, res) => {

            const newPost = subscriberSchema({
                name: req.body.name,
                subToChannel: req.body.subToChannel
            });

            try {

                const savedPost = await newPost.save();

                res.status(201).json(savedPost); //status 201 indicates an object has succesfully been created in the database
                
            } catch (err) {
                res.status(400).json({message: err.message}); //status 400 indicates user/client gave bad data to server/api
            }
      });
      
      //3. update a sub
      router.patch('/:id', (req, res) => {
        
      });

      //4. delete a sub
      router.delete('/:id', getSubscriber, async (req, res) => {

        try {
            
            const deletedPost = await subscriberSchema.deleteOne({_id: res.subscriberRequestedData.id});

            res.send(deletedPost);

        } catch (err) {

            console.log('\nAn error occured trying to delete the sub with an id of', res.subscriberRequestedData.id );
            
            
            res.json({message: err.message});
            
        }
        
      });

      //5. get specific sub
      router.get('/:id', getSubscriber, async (req, res) => {

        let subscriberName = res.subscriberRequestedData.name;

        console.log(subscriberName);
        

        res.json({name: subscriberName});

      });


//MIDDLEWARE FOR GETTING USER BY ID
async function getSubscriber(req, res, next) {

    //the id given by the client to the api then passed to through the model to retrieve a specific peice of data from the database
    const userId = req.params.id;

    console.log('\nGetting request for', userId);
    
    //this variable will store the data retreived from the database
    let userSubscription;

    try {
        
        userSubscription = await subscriberSchema.findById(userId);

        if (userSubscription == null) {

            console.log('User tried to request a non-existant sub');

            return res.status(404).json({message: "There is no suscriber with this id"});
        }

    } catch (err) {

        console.log(`Request for ${userId} was not successful\n`);

        return res.status(500).send({message: err.message});

    }

    res.subscriberRequestedData = userSubscription;
    
    next()
}


//EXPORTING /sub middleware to server.js
module.exports = router;