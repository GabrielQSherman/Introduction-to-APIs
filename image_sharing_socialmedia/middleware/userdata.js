

userdata = async(req, res, next) => {

    user = req.user;

    req.username = user.username;

    next()
};

module.exports = userdata