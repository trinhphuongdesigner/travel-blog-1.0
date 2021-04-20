const mongoose = require('mongoose');

const { Schema } = mongoose;

const userFollowerSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  followingId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user_followers', userFollowerSchema);
