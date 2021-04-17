const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: 'Anonymous',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  birthday: Date,
  role: {
    type: String,
    default: 'CONTRIBUTOR', // ADMIN | MANAGER | CONTRIBUTOR
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  phone: String,
  address: String,
  about: String,
  socialLink: {
    facebook: String,
    instagram: String,
    web: String,
    other: String,
  },
  bookmarkFolderId: {
    type: Schema.Types.ObjectId,
    require: true,
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

userSchema.pre('save', function a(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(candicatePassword) {
  return bcrypt.compareSync(candicatePassword, this.password);
};

module.exports = mongoose.model('users', userSchema);
