const router = require('express').Router();
let Post = require('../models/post.model'); //requiring post database model


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

//route for finding posts by id
router.route('/:id').get((req, res) => { 
    Post.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//route for deleting posts
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//route for updating posts
router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        post.username = req.body.username;
        post.context = req.body.context;

        post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;