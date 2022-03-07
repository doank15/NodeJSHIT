const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers/UserRouter');
require('dotenv').config();

const url = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 3000
const app = express();


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/router',router)
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