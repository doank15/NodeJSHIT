const mongoose = require("mongoose");
const { Schema } = mongoose;
const Post = require("./PostModel");
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
