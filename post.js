const express = require('express'),
      route = express.Router(),

      postSchema = require('../models/Post');

route.get('/', (req, res) => {
    res.json({
        message: "you are on the post page"
    })
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