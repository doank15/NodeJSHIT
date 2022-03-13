const express = require('express');
const Post = require('../models/PostModel');
const catchAsync = require('../untils/catchAsync')
const User = require('../models/UserModel')


exports.getAllPosts = catchAsync(async (req,res,next) => {
    let result = await Post.find();

    res.status(200).json({
        status: "success",
        data: result
    })
})

exports.getPostByID = catchAsync(async (req, res, next) => {
    let {id} = req.params;
    const post = await Post.findById(id);
    
    res.status(200).json({
        status: "success",
        data: post
    })
})

exports.addPostForAuthor = catchAsync(async (req, res, next) => {
    const newPost = Post.create(req.body);
    if(req.body.author) {
        const author = await User.findById(req.body.author);
        await author.updateOne({$push: {posts: newPost._id}});
    }
    res.status(200).json({
        status: "success",
        data: newPost
    })
})

exports.updatePostByID = catchAsync(async (req, res, next) => {
    const {id} = req.params;

    const post = Post.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        status: "success", 
        data: post
    })
})

exports.deletePostByID = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const post = Post.findByIdAndDelete(id)

    res.status(200).json({
        status: "success",
        data: null
    })
})
