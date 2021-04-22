const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('./models');

const app = express();

const routes = require('./routers');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  name: 'TravelBlog',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Blog' }),
  cookie: {
    expires: 15 * 60 * 60,
    httpOnly: false,
  },
}));
app.use(flash());

// passport.serializeUser(User.serializeUser()); // session encoding
// passport.deserializeUser(User.deserializeUser()); // session decoding
// passport.use(new LocalStrategy(User.authenticate()));

app.set('view engine', 'ejs');
app.set('views', './views');
app.engine('ejs', ejsMate);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/static', express.static('./static'));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Running in ${process.env.PORT}`);
});
