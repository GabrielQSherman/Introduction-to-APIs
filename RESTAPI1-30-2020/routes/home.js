const express = require('express'),
      router = express.Router();

router.get('', (req, res) => {

    res.render('index', {title: "Homepage", message: "You are on the homepage"});

});

module.exports = router;