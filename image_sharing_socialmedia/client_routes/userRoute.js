const express = require('express'),

      router = express.Router(),

      userSchema = require('../models/User'),

      auth = require('../middleware/auth');

      router.get('/:username', (req, res) => {

            res.render('user', {userName: req.params.username, userInfo: 'world'});

      })


      module.exports = router;