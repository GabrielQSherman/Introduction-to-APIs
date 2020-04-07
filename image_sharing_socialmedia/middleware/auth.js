const jwt = require('jsonwebtoken'),
      cookie = require('cookie'),
      User = require('../models/User'),

//USING COOKIES INSTEAD OF AuthHeader
auth = async(req, res, next) => {

    try {

        //a token variable is defined from the header (authorization portion) of the request

        // console.log(req.headers.cookie);

        if (req.headers.cookie === undefined) {

            req.authMsg = 'No JWT Found';

            return next()
        }

        const cookiesJson = cookie.parse(req.headers.cookie);

        const token = cookiesJson.temp_token; 
        
        //this will return a payload, that will contain _id needed to locate a specific document in the database
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });

        if (!user) {

            req.authMsg = 'Authorization Mismatch'

            return next()
        }

        req.user = user
        req.token = token
        
        next()

    } catch (err) {

        res.status(500).json({ error: err.message })
        
    }

};

module.exports = auth