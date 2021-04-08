const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  categoryId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  coverImage: String,
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subTitle: String,
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
      default: 'PLAY', //PLAY | EAT | STAY
    },
    description: String,
    address: String,
    price: Number,
    transportation: Array,
    totalTime: Number, //Hours
    people: Number,
    howToGo: String,
    activeTime: Array,
    suggestion: String,
  },
});

module.exports = mongoose.model("posts", postSchema);