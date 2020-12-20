const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //mongoose helps connecting to MongoDB

require('dotenv').config();

// creating an Express-server
const app = express(); 
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Creating the connection to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connected successfully");
})

//requiring routefiles
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

//using the route files
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});