const express = require('express'),
      Router = express.Router(),

      postSchema = require('../models/Post');

//GET ALL post when user request /post page -load all
Router.get('/', async (req, res) => {
    try {
        //create a async variable that waits for mongoose to load all post in the database
        const allPost = await postSchema.find();

        //display all post to user
        res.json(allPost)

        //send to the server console that a request for all post has been made
        console.log('\n\n\nAll post shown\n');
        
    } catch (err) {
        console.log(err);
        
        res.json({message: err})
    }
})

//GET a single post by ID - load a specific post
Router.get('/:postId', async (req, res) => {

    console.log('\n\nget post id', req.params.postId,'\n\n');
    
    try {
        //wait for the searchfor post to 
        const searchPost = await postSchema.findById(req.params.postId);

        res.json(searchPost)

    } catch (err) {

        res.json({
            message: "post could not be found",
            error: err
        })
    }
})

//DELETE Post by ID
Router.delete('/:postId', async (req, res) => {

    try {
        //declare the post that will be deleted
        const findPost = await postSchema.findById(req.params.postId)

        //send the found post to user
        res.json(findPost);

        //deletePost will be a report of the post/s that were deleted. 
        //since id are unquie to each post this will only ever delete one post, but you could also delete post by title or date
        const deletePost = await postSchema.deleteOne({_id: req.params.postId });

        //send report to the console
        console.log('\n\nDeletion Report', deletePost, '\n\n');
        
    } catch (err) {
        
        res.json({
            message: "post could not be deleted",
            error: err
        })
    }
    
    
})

//PATCH A POST
Router.patch('/:postId', async (req, res) => {
    try {
        
        const updatedPost = await postSchema.updateOne(
            { _id: req.params.postId }, 
            { $set: {title: req.body.title} }
        );

        console.log('Post Updated: id', req.params.postId);

        res.json(updatedPost);
        

    } catch (err) {
        
        res.json({
            message: "post could not updated",
            error: err
        })
    }


})


//Post a json obj to personal MongoDataBase
Router.post('/', async (req, res) => {

    const currPost = new postSchema({

        title: req.body.title,
        message: req.body.message
    });

    try {

        const savedPost = await currPost.save();

        res.json(currPost);
        console.log(currPost);

    } catch (err) {
        console.log(`Post Error: ${err}`);
        res.json({error_message: err});
    }

})

module.exports = Router;