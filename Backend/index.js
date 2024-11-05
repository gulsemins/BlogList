require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./models/blog");
const User = require("./models/users");
const usersRouter = require("./controllers/usersController"); // Import the usersRouter
const blogsRouter = require("./controllers/blogControllers");
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.error("error connecting to MongoDB:", error.message)
  );

app.use(express.json()); //Bu başta yazmalıyız yazmazsak text olan bodyi, json yapıyor. ben bunu sonda kullandım olmadı bodyi görmedi bodyi json açeviriyor
app.use(express.static("dist"));
app.use(requestLogger); //bilgi için

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
