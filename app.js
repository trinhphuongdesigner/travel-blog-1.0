const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('./models');

const app = express();

const routes = require('./routers');
const modulesRoutes = require('./modules/routes');

const port = 3001;

mongoose.connect('mongodb://localhost:27017/Blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  secret: 'Any normal Word', // decode or encode session
  resave: false,
  saveUninitialized: false.valueOf,
  // cookie: {
  //   expires: 15 * 60 * 60,
  //   httpOnly: false,
  // },
}));

passport.serializeUser(User.serializeUser()); // session encoding
passport.deserializeUser(User.deserializeUser()); // session decoding
passport.use(new LocalStrategy(User.authenticate()));

app.set('view engine', 'ejs');
app.set('views', './views');
app.engine('ejs', ejsMate);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static('./static'));

app.use(routes);
app.use(modulesRoutes);

app.listen(port, () => {
  console.log(`Running in ${port}`);
});
