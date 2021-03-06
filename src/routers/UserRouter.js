const express = require('express');
const router = express.Router();
const userSchema = require('../controller/UsersControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const registerConstroller = require('../controller/RegisterAndLogin');
router.route('/')
.get(authMiddleware.authorization,userSchema.getUsers)
.post(userSchema.postUser)

router.route('/age-condition')
.get(authMiddleware.authorization,userSchema.getUserByAgeCondition)

router.route('/name-condition')
.get(authMiddleware.authorization,userSchema.getUserByUserNameCondition)

router.route('/:id')
.get(userSchema.getUserById)
.post(userSchema.updateUserByID)
.delete(userSchema.deleteUserByID)

router.post('/register', registerConstroller.userRegister)
router.post('/login', registerConstroller.userLogin)
module.exports = router