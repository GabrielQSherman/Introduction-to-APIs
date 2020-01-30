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

            console.log('\nClient is attempting to post...');
            

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

            console.log('POST REQUEST SUCCESS\n');
      });
      
      //3. update a sub
      router.patch('/:id', getSubscriber, async (req, res) => {

        //update the object in database only if the properties are present in the the req.body
            if (req.body.name != null) {

                let newData = req.body.name;

                res.subscriberRequestedData.name = newData;
            }

            if (req.body.subToChannel != null) {

                let newData = req.body.subToChannel;

                res.subscriberRequestedData.subToChannel = newData;
            }

            try {

                const updatedPost = await res.subscriberRequestedData.save()

                res.json(updatedPost);

                console.log('PATCH REQUEST SUCCESS\n');
                
            } catch (err) {

                res.json({message: err.message});
            }

      });

      //4. delete a sub
      router.delete('/:id', getSubscriber, async (req, res) => {

        try {
            
            const deleteReport = await subscriberSchema.deleteOne({_id: res.subscriberRequestedData.id});
            //alt use .remove()

            res.json({
                message: "subscriber was sucessfully deleted from database",
                name: res.subscriberRequestedData.name,
                channel_name: res.subscriberRequestedData.subToChannel,
                date_subscribed: res.subscriberRequestedData.subDate,
                date_unsubscribed: Date(Date.now()).toString().substr(0,15)

            });

            console.log(deleteReport);
            

        } catch (err) {

            console.log('\nAn error occured trying to delete the sub with an id of', res.subscriberRequestedData.id );
            
            
            res.json({message: err.message});
            
        }

        console.log('DELETE REQUEST SUCCESS\n');
        
      });

      //5. get specific sub
      router.get('/:id', getSubscriber, async (req, res) => {

        let subscriberName = res.subscriberRequestedData.name;

        console.log(subscriberName);
        

        res.json({name: subscriberName});

        console.log('GET SUB BY ID REQUEST SUCCESS\n');

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

        console.log(`Request for ${userId} was not success\nful\n`);

        return res.status(500).send({message: err.message});

    }

    res.subscriberRequestedData = userSubscription;
    
    next()
}


//EXPORTING /sub middleware to server.js
module.exports = router;