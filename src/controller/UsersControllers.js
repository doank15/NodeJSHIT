const Users = require("../models/UserModel");
const Post = require("../models/PostModel");
const catchAsync = require("../untils/catchAsync");

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await Users.find().populate("Post")
    res.status(200).json({
        status: "Success",
        data: users,
    })
});

exports.postUser = catchAsync(async (req, res,next) => {
  const newUser = Users.create(req.body);
  res.status(200).json({
    status: "Success",
    data: newUser,
  });
});
exports.getUserByAgeCondition = catchAsync(async (req, res, next) => {
  const user = await Users.find({ age: { $gte: 18, $lte: 40 } });
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

exports.getUserByUserNameCondition = catchAsync(async (req, res, next) => {
  const user = await Users.find({ name: /^h/ });
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

exports.addUser = catchAsync(async (req, res, next) => {
  const user = req.body;
  Users.create(user);
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findById(id).populate("Post");

  res.status(200).json({
    status: "Success",
    data: user,
  });
});
exports.updateUserByID = catchAsync(async (req, res, next) => {
  try {
    let { id } = req.params;
    let result = await Users.findByIdAndUpdate(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

exports.deleteUserByID = async (req, res) => {
  try {
    let { id } = req.params;
    await Users.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
