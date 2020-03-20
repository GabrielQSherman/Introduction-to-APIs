

userdata = async(req, res, next) => {

    let user = req.user;
    
    req.posts = user.posts;

    req.username = user.username

    req.totalPosts = user.posts.length

    //algorithm that counts the number of likes a user has 
    let totalLikes = 0;

    user.posts.forEach(post => {

        totalLikes += post.likes.length
        
    });
    //end of alg

    req.totalLikes = totalLikes;

    next()
};

module.exports = userdata