const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, min: 8, required: true },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
