const express = require('express'),
      mongoose = require('mongoose'),
      subRouter = express.Router();


      subRouter.get('/', (req, res) => {
          res.json({message: "welcome to the sub page!"});
      })

module.exports = subRouter;