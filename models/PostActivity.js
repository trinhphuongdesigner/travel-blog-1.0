const mongoose = require('mongoose');

const { Schema } = mongoose;

const postActivitySchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
  activity: {
    type: String,
    require: true, // C | U | D
  },
});

module.exports = mongoose.model('post_activities', postActivitySchema);
