const mongoose = require('mongoose');

const { Schema } = mongoose;

const userFollowerSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followingId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user_followers', userFollowerSchema);
