const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
