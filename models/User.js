const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: "Anonymous",
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
  },
  birthday: Date,
  role: {
    type: String,
    default: "CONTRIBUTOR", // ADMIN | MANAGER | CONTRIBUTOR
  },
  email: String,
  phone: String,
  address: String,
  about: String,
  socialLink: {
    facebook: String,
    instagram: String,
    web: String,
    other: String,
  },
  bookmarkFolderId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", userSchema);
