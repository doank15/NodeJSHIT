const bcrypt = require('bcryptjs/dist/bcrypt');
const Users = require('../models/UserModel');
const catchAsync = require('../untils/catchAsync');
const jwt = require('jsonwebtoken');
exports.userRegister = catchAsync(async (req, res) => {
        //getUser
        const {firstName, lastName, email, password} = req.body;
        
        if(!(email &&password && lastName &&firstName)) {
            res.status(400).send("All input is required")
        }

        //check if user already exist
        const oldUser = await Users.find({email})
        if(oldUser) {
            return res.status(409).send('User existed. Please Login')
        }

        //encrypt user password
        encryptedPassword = await bcrypt.hash(password,10)
        const user = await Users.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        //create token
        const token = jwt.sign(
            {userID: user._id, email},
            process.env.TOKEN_KEY,
            {expiresIn: '2h'}
        );
        
        //save user token
        user.token = token;
        //return new user
        res.status(200).json({
            status: 'Successfully',
            data:user
        });
})

exports.userLogin = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    if(!(email && password)) {
        res.status(400).send("All input is required")
    }
    const user = Users.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        //create token
        const token = jwt.sign(
            {userID: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        //save user token 
        user.token = token;
        res.status(200).json({
            status:"Successfully",
            data: user
        })
    }
    res.status(400).send("Invalid Confirm")
})