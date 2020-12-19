const router = require('express').Router();

//Requiring the mongoose user model
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find() //finds all the users from the Database
        .then(users => res.json(users)) //returning the users in json-format
        .catch(err => res.status(400).json('Error: ' + err)); //returns error message
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const newUser = new User ({username, password});

    newUser.save() //user is saved to the database
        .then(() => res.json('User added!')) //returning success message
        .catch(err => res.status(400).json('Error: ' + err)); //returning error message
});

module.exports = router;