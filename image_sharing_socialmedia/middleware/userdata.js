

userdata = async(req, res, next) => {

    let user = req.user;
    
    req.post = user.post;

    req.username = user.username

    req.totalPosts = user.posts.length
    
    console.log(user);
    //next step
    //algorithm that counts the number of likes a user has 
    let totalLikes = 0;

    //end of alg

    req.totalLikes = totalLikes;

    next()
};

module.exports = userdata