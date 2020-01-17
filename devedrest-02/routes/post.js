const express = require('express'),
      Router = express.Router(),

      postSchema = require('../models/Post');


Router.get('/', (req, res) => {
    res.json({
        message: 'you are on the post page'
    })
})

Router.post('/', (req, res) => {

    

})

module.exports = Router;