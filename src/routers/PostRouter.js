const express = require('express');
const router = express.Router();
const postSchema = require('../controller/PostConstrollers');

router
.route('/')
.get(postSchema.getAllPosts)
.post(postSchema.addPostForAuthor)

router.route('/:id')
.get(postSchema.getPostByID)
.put(postSchema.updatePostByID)
.delete(postSchema.deletePostByID)


module.exports = router;


