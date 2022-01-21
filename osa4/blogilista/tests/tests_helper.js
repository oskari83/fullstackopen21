const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Why veganism is good",
    author: "Dave Dittle",
    url: "www.veganworld.eu/articles/vegans-rule/",
    likes: 4,
  },
  {
    title: "The love of McLaren F1",
    author: "Ray Spencer",
    url: "www.theverge.com/blogs/opinions/spencerf1",
    likes: 14,
  },
]

const initialUsers = [
    {
      username: "First",
      name: "First User",
      passwordHash: "testPassword"
    },
  ]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, blogsInDB
}