const bcrypt = require("bcrypt");
const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/users");

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);

  // const { url, title, author  } = request.body;

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    users: user.id,
  });

  //burası şey için ( biz üst satırda blog içinde user ilişkisi kurduk ve kaydettik şimdi user içerisinde yeni bloğun idsini güncellememiz ilişkisini kurmamız gerekiyor)
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

module.exports = blogRouter;
