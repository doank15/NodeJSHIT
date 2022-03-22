const User = require('../models/UserModel');
const catchAsync = require('../untils/catchAsync');
const jwt = require('jsonwebtoken');


module.exports =  {
    authorization : catchAsync(async (req, res, next) => {
        const {id} = req.query;
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        if(user.role !== 'admin') {
            return res.status(200).json({message: "Role not allowed"})
        }
        next();
    }),
    verifyToken: catchAsync(async ( req, res, next) => {
        const token = req.body.token || req.query.token || req.header["x-access-token"]
        if(!token) {
            return res.status(403).send('A token is required!!!')
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY)
            req.user = decoded
        } catch (error) {
           return res.status(401).send('Invalid Token')
        }
        return next()
    })
}