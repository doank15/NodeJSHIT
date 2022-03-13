const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./src/routers/UserRouter');
const PostRouter = require('./src/routers/PostRouter');
require('dotenv').config();

const url = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 3000
const app = express();


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/users',UserRouter)
app.use('/posts', PostRouter)
app.get('/', (req, res) => {
    res.send(`Listen on ${PORT}`);
})

mongoose.connect(url, (err) => {
    if(err) {
        console.log(`Error: ${err}`);
    }
    else {
        console.log('Connected Successfully!');
    }
})
//How to we start listening to the server
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}` );
});