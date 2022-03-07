const express = require('express');
const router = express.Router();
const userSchema = require('../controller/UsersControllers');

router.get('/users', userSchema.getUsers);
router.post('/users', userSchema.postUser);
router.get('/users/:userID', userSchema.getUserById);
router.patch('/users/:userID', userSchema.updateUserByID)
router.delete('/users/:userID', userSchema.deleteUserByID)
module.exports = router