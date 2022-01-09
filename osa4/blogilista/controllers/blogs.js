const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
})

blogsRouter.post('/', async (request,response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({
          error: 'title missing'
        })
    }
    
    if (!body.url) {
        return response.status(400).json({
          error: 'url missing'
        })
    }

    if(!body.likes){
        body.likes = 0
    }

    const newblog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const blogsResult = await newblog.save()
    response.status(200).json(blogsResult.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogs = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blogEdit = {
      title: body.name,
      author: body.number,
      url: body.url,
      likes: body.likes
    }
  
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blogEdit, { new: true })
    response.json(updateBlog.toJSON())
})

module.exports = blogsRouter