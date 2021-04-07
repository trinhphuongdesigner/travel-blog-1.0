const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userCommentSchema = new Schema({
  commentId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,F
});

module.exports = mongoose.model("usercomments", userCommentSchema);
