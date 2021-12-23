const blogRoute = require("express").Router();
const Blog = require("../model/blog");

blogRoute.get("/", (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.send(blogs);
    })
    .catch((e) => res.send(e.message));
});
blogRoute.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      res.send(blog);
    })
    .catch((e) => res.send(e.message));
});

blogRoute.post("/", (req, res) => {
  Blog.create(req.body)
    .then((blog) => res.send("blog created successfully"))
    .catch((e) => res.send(e.message));
});

blogRoute.put("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(
    { _id: id },
    { title: req.body.title, body: req.body.body },
    { new: true }
  )
    .then(() => res.send("updated the Blog"))
    .catch((e) => res.send(e.message));
});

blogRoute.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete({ _id: id })
    .then((blog) => res.send(blog))
    .catch((e) => res.send(e.message));
});

module.exports = blogRoute;
