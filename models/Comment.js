const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
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
