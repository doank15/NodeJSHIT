const express = require('express');
const router = express.Router();
const fs = require('fs');

// const Post = require('../models/Post');

//Read file
let data = [
    {
        id: 1,
        name: "Nguyen Van A",
        age : 20,
        gender : "male"
    },  
    {
        id: 2,
        name: "Nguyen Van C",
        age: 19,
        gender: "female"
    }
];

//get All User
router.get('/getAll', (req, res) => {
    res.json(data);
})

//post
router.post('/postData', (req, res) => {
    let user = req.body;
    data.push(user);
    res.send("Got your request");
})

//update
router.put('/update-UserbyID/:id', (req, res) => {
    let user = req.body;
    let {id} = req.params;
    try {
        let index = data.findIndex((user) => id == user.id)
        if(index === -1) {
            console.log("This Data is not exist")
            res.send("Not exist");
        }; 
        data[index].name = user.name;
        data[index].age = user.age;
    } catch (err) {
        res.json({
            status: 404,
            message: err.message
        })
    }
    res.send("Successful!!")
})  

//delete
router.delete('/deleteData/:id', (req, res) => {
    
    try {
        let {id} = req.params;
        data = data.filter((data) => data.id != id );
        console.log(data);
        res.send("Deleted This " + id);
    } catch (err) {
        res.json({
            status: 404,
            message: err.message
        })
    }
})
module.exports = router