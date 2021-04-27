const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'posts',
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'comments',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('votes', voteSchema);
