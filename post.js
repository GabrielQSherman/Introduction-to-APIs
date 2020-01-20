const express = require('express'),
      route = express.Router();

route.get('/', (req, res) => {
    res.json({
        message: "you are on the post page"
    })
})

module.exports = route;