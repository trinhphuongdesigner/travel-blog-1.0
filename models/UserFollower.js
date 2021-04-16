const mongoose = require('mongoose');

const { Schema } = mongoose.Types;

const userFollowerSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  followingId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

module.exports = mongoose.model('user_followers', userFollowerSchema);
