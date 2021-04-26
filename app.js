const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
require('dotenv').config();

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
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  cookie: {
    expires: 15 * 60 * 60,
    httpOnly: false,
  },
}));
app.use(flash());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.engine('ejs', ejsMate);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.use('/static', express.static('./static'));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Running in ${process.env.PORT}`);
});
