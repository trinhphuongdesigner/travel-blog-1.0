const mongoose = require("mongoose");

const { Schema } = mongoose;

const userFollowerSchema = new Schema({
  followerId: Schema.Types.ObjectId,
  followingId: Schema.Types.ObjectId,
});

module.exports = mongoose.model("user_followers", userFollowerSchema);
