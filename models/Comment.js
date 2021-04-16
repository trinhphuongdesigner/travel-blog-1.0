const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  vote: Number,
});

module.exports = mongoose.model("comments", commentSchema);
