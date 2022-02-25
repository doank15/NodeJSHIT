const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// require('dotenv/config');
const app = express();

app.use(express.json())
app.use(bodyParser.json())
//import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// Routes

// app.get('/', `(req,res) => {
//     res.send("I was here");
// })

//Connect to DB

// mongoose.connect(process.env.DB_CONNECTION, () => {
//     console.log("Connected To DB!!!");
// })


//How to we start listening to the server
app.listen(3000);