const router = require('express').Router();
let Post = require('../models/post.model'); //requiring post database model

//route for getting the posts
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//route for posting
router.route('/add').post((req, res) => { 
    const username = req.body.username;
    const context = req.body.context;

    const newPost = new Post({
        username,
        context,
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));  
});


module.exports = router;