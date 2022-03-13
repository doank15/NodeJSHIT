const User = require('../models/UserModel');
const catchAsync = require('../untils/catchAsync');


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
    })
}