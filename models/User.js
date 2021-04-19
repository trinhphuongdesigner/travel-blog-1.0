const mongoose = require('mongoose');

const { Schema } = mongoose;

const passportLocalMongoose = require('passport-local-mongoose');

const bcrypt = require('bcrypt');

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
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
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
}, {
  timestamps: true,
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
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

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', userSchema);
