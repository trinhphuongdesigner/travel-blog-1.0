const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'posts',
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  vote: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('comments', commentSchema);
