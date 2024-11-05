const mongoose = require("mongoose");
const users = require("./users");

const blogSchema = new mongoose.Schema({
  url: String,
  title: String,
  author: String,
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
