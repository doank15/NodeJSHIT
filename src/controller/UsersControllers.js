const Users = require('../models/UserSchema');

exports.getUsers = async (req, res) => {
    try {
        let result = await Users.find();
        res.json(result);
    } catch (error) {
        res.send({message: error});
    }
}

exports.postUser = async (req, res) => {
    try {
        const user = new Users({
            email : req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        Users.insertMany(user, (err, res) => {
            if(err) throw err;
            res.send("Successfully!") 
        })
    } catch (error) {
        res.status(404).send({message: error})
    }
}

exports.getUserById = async (req, res) => {
    try {
        let id = req.params.userID;
        let result = await Users.findById(id).exec()
        // console.log(result);
        res.json(result);
    } catch (error) {
        res.status(404).send({message: error})
    }
} 


exports.updateUserByID = async (req, res) => {
    try {
        let id = req.params.userID;
        // let {email} = req.body.email;
        let result = await Users.findByIdAndUpdate({_id: id},{email: req.body.email});
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(404).send({message : error})
    }
}

exports.deleteUserByID = async (req, res) => {
    try {
        let id = req.params.userID;
        await Users.findByIdAndDelete({_id: id});
        res.status(200).send("Deleted");
    } catch (error) {
        res.status(404).send({message: error})
    }
}