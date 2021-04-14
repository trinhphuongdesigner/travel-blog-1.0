const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

const app = express();

const routes = require("./routers");
const modulesRoutes = require('./modules/routes');

const port = 3001;

mongoose.connect("mongodb://localhost:27017/Blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.engine("ejs", ejsMate);
app.use("/static", express.static("./static"));

app.use(routes);
app.use(modulesRoutes);

app.listen(port, () => {
  console.log(`Running in ${port}`)
});