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
      router.delete('/:id', (req, res) => {
        
      });

      //5. get specific sub
      router.get('/:id', (req, res) => {
        
      });

module.exports = router;