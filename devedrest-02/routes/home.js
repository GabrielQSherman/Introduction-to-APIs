const express = require('express');
      router = express.Router();

router.get('/', (req, res) => {
    res.send('you are home')
    console.log(`Visited '/' root route`)
})

module.exports = router;