const mongoose = require("mongoose");

const { Schema } = mongoose;

const userCommentSchema = new Schema({
  commentId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
});

module.exports = mongoose.model("user_comments", userCommentSchema);
