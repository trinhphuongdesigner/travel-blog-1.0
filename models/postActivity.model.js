const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postActivitySchema = new Schema({
  postId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  timeStamp: {
    type: Date,
    default: new Date(),
  },
  activity: {
    type: String,
    require: true, // C | U | D
  },
});

module.exports = mongoose.model("postactivities", postActivitySchema);
