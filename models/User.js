const mongoose = require("mongoose");


const user = mongoose.model('user',{
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
  bookmarkFolderId: Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = user
