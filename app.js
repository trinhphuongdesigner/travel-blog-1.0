const express = require("express");
const ejsMate = require("ejs-mate");

const app = express();

const routes = require("./routers");
const port = 3001;

app.set("view engine", "ejs");
app.set("views", "./views");

app.engine("ejs", ejsMate);
app.use("/static", express.static("./static"));

app.use(routes);

app.listen(port);
