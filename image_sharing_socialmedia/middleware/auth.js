const jwt = require('jsonwebtoken'),
      User = require('../models/User'),


//this is a middleware function that will authorize a login attempt via JSON web tokens
     auth = async(req, res, next) => {

    try {

        //a token variable is defined from the header (authorization portion) of the request
        //then a data variable is defined 

        if (req.header('Authorization') === undefined) {
            throw new Error('Not Auth Header Found')
        }

        const token = req.header('Authorization').replace('Bearer ', ''); //req.header('auth') will have an extra string attached to the token that is not necessary for the next step
        
        //this will return a payload, that will contain _id needed to locate a specific document in the database
        const data = jwt.verify(token, process.env.JWT_KEY);

    

        const user = await User.findOne({ _id: data._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Not authorized to access this resource')
        }

        req.user = user

        req.token = token
        
        next()

    } catch (err) {

        res.status(401).json({ error: err.message })
        
    }

};

module.exports = auth