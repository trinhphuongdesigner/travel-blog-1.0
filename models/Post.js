const mongoose = require('mongoose');

const getSlug = require('speakingurl');

const { Schema } = mongoose;

const postSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'categories',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  coverImage: String,
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subTitle: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: 'PENDING', // PENDING | ACTIVE | UPDATE | CLOSE
  },
  type: {
    type: String,
    default: 'NORMAL', // NORMAL | ADVANCED
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  endContent: String,
  startDate: Date,
  currency: {
    type: String,
    conversionRate: Number,
  },
  transportation: Array,
  totalPrice: Number,
  howToGo: String,
  duration: Number,
  tags: Array,
  vote: Number,
  locations: {
    title: {
      type: String,
      trim: true,
    },
    subTitle: String,
    type: {
      type: String,
      default: 'PLAY', // PLAY | EAT | STAY
    },
    description: String,
    address: String,
    price: Number,
    transportation: Array,
    totalTime: Number, // Hours
    people: Number,
    howToGo: String,
    activeTime: Array,
    suggestion: String,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
});

// eslint-disable-next-line func-names
postSchema.pre('save', function (next) {
  const post = this;

  if (!post.isModified('title')) return next();

  const slug = getSlug(post.title, {
    lang: 'vn',
  });

  post.slug = slug;

  next();
});

module.exports = mongoose.model('posts', postSchema);
