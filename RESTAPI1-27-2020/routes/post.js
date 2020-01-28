const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();

router.get('/', (req,res) => {
    res.json({message: "you are on the post page!"});
});


module.exports = router;