const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

const app = express();

const routes = require("./routers");
const port = 3001;

mongoose.connect("mongodb://localhost:27017/Blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Implement Model
const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  birthday: Date,
  role: String, // ADMIN | MANAGER | CONTRIBUTOR
  email: String,
  phone: String,
  address: String,
  about: String,
  socialLink: {
    facebook: String,
    instagram: String,
    web: String,
    other: String,
  },
  bookmarkFolderId: mongoose.ObjectId,
  createdAt: String,
  updatedAt: String,
});

const UserFollower = mongoose.model("UserFollower", {
  followerId: mongoose.ObjectId,
  followingId: mongoose.ObjectId,
});

const PostActivity = mongoose.model("PostActivity", {
  postId: mongoose.ObjectId,
  userId: mongoose.ObjectId,
  time: Date,
  activity: String, // C | U | D
});

const Categories = mongoose.model("Categories", {
  name: String,
  status: String, // ACTIVE | INACTIVE
  createdAt: String,
  updateAt: String,
});

const UserComment = mongoose.model("UserComment", {
  commentId: mongoose.ObjectId,
  postId: mongoose.ObjectId,
  userId: mongoose.ObjectId,
});

const Comment = mongoose.model("Comment", {
  createdAt: String,
  content: String,
  vote: Number,
});

const Post = mongoose.model("Post", {
  categoryId: mongoose.ObjectId,
  userId: mongoose.ObjectId,
  coverImage: String,
  title: String,
  subTitle: String,
  status: String, // PENDING | ACTIVE | UPDATE | CLOSE
  type: String, // NORMAL | ADVANCED
  content: String,
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
    title: String,
    subTitle: String,
    type: String, //PLAY | EAT | STAY
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

const BookmarkLink = mongoose.model("BookmarkLink", {
  bookmarkFolderId: mongoose.ObjectId,
  postId: mongoose.ObjectId,
  createdAt: Date,
});

const BookmarkFolder = mongoose.model("BookmarkFolder", {
  userId: mongoose.ObjectId,
  title: String,
});

// add new user
app.get("/users", async (req, res) => {
  try {
    const addUserList = new User({
      firstName: "Trịnh",
      lastName: "Phương",
      birthday: 09 / 07 / 1996,
      role: "ADMIN", // ADMIN | MANAGER | CONTRIBUTOR
      email: "trinhphuong.designer+1@gmail.com",
      phone: "0386592529",
      address: "Điện Biên Phủ - Đà Nẵng",
      about: "String",
      socialLink: {
        facebook: "https://www.facebook.com/trinhphuong.designer",
        instagram: "",
        web: "",
        other: "",
      },
      bookmarkFolderId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await addUserList.save();
    res.send("Dang ky thanh cong");
  } catch (err) {
    res.send(error);
  }
});

// add new user
app.get("/categories", async (req, res) => {
  try {
    const addCategoryList = new Categories({
      name: "Travel",
      status: "ACTIVE", // ACTIVE | INACTIVE
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await addCategoryList.save();
    res.send("Dang ky thanh cong");
  } catch (err) {
    res.send(error);
  }
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.engine("ejs", ejsMate);
app.use("/static", express.static("./static"));

app.use(routes);

app.listen(port);
