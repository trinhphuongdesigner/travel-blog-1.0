const mongoose = require('mongoose');

const { Schema } = mongoose;

// const passportLocalMongoose = require('passport-local-mongoose');

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
    // eslint-disable-next-line no-useless-escape
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, 'Password must contain at least eight and maximum 10 characters characters, at least one number and both lower and uppercase letters and special characters'],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    trim: true,
    // match: [/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Please fill a valid phone number'],
  },
  address: String,
  about: String,
  socialLink: {
    facebook: String,
    instagram: String,
    web: String,
    other: String,
  },
  avatar: {
    type: String,
    default: 'https://i.pinimg.com/originals/be/2d/30/be2d307e7f0004d3b014ee1120756a93.jpg',
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

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', userSchema);
