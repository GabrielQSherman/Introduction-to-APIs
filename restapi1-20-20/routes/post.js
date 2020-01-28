const express = require('express'),
      route = express.Router(),

      postSchema = require('../models/Post');

route.get('/', async (req, res) => {

   try {

    const allPost = await postSchema.find();

    res.json({
        All_Post: allPost
    })
       
   } catch (err) {

        console.log(err);
        
        res.status(500).json({
            message: err
        })
       
   }
})

route.post('/', async (req, res) => {

    const currPost = new postSchema({
        title: req.body.title,
        message: req.body.message
    });

    try {

        const savedPost = await currPost.save() 

        res.status(200).json({
            yourpost: savedPost
        })
        
    } catch (err) {

        console.log(err);
        

        res.status(500).json({
            message: err
        })
        
    }

})

module.exports = route;