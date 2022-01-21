const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
})

blogsRouter.post('/', async (request,response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

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
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await newblog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save({ validateModifiedOnly: true })
    response.status(200).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blogT = await Blog.findById(request.params.id)
    const blogID = request.params.id
    const user = request.user
    if(blogT.user.toString() === decodedToken.id.toString()){
        user.blogs = user.blogs.filter((value,index)=>{
            return value!==blogID
        })
        await user.save({ validateModifiedOnly: true })
        const blogs = await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }else{
        return response.status(401).json({ error: 'cannot delete someone elses post' })
    }
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