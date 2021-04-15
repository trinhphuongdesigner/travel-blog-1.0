const express = require("express");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

const routes = require("./routers");
const modulesRoutes = require('./modules/routes');

const port = 3001;

mongoose.connect("mongodb://localhost:27017/Blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

<<<<<<< HEAD
=======



>>>>>>> c121b2a9bcb217da1288b567f1304507213c6d95
app.set("view engine", "ejs");
app.set("views", "./views");
app.engine("ejs", ejsMate);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
<<<<<<< HEAD
=======

>>>>>>> c121b2a9bcb217da1288b567f1304507213c6d95
// parse application/json
app.use(bodyParser.json())

app.use("/static", express.static("./static"));

app.use(routes);
<<<<<<< HEAD
app.use(modulesRoutes);

app.listen(port, () => {
  console.log(`Running in ${port}`)
});
=======
app.use(routesModule);

app.listen(port);
>>>>>>> c121b2a9bcb217da1288b567f1304507213c6d95
