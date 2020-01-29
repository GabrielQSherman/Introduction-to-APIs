const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();

      //Routes to create...

      //1. get all subs
      router.get('/', (req, res) => {

        res.json({message: "you are looking at all subs"});
        
      });

      //2. create a sub
      router.post('/', (req, res) => {
        
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