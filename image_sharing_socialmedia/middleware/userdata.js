

userdata = async(req, res, next) => {

    user = req.user;

    console.log(user);
    

    req.username = user.username;



    next()
};

module.exports = userdata