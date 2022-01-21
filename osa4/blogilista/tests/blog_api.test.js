const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tests_helper')
const app = require('../app')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

const api = supertest(app)

describe('blog Tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(2)
  })

  test('there is an id field', async () => {
      const response = await api.get('/api/blogs')
      for (let d of response.body){
          expect(d.id).toBeDefined()
      }
      expect(response.body).toBeDefined()
  })

  test('a valid blog can be added ', async () => {
      const InitialResponse = await api.get('/api/blogs')
      const initialLength = InitialResponse.body.length

      const newUs = {
        username: 'SuperUser',
        name: 'Superuser',
        passwordHash: 'password',
      }
      await api
        .post('/api/users')
        .send(newUs)

      const defaultUser = {
        username: "SuperUser",
        password: "password"
      }

      const loginResponse = await api.post('/api/login').send(defaultUser)
      const token = "bearer " + loginResponse.body.token
      const newBlog = {
        title: "NewBlogTest",
        author: "Blogtest Author",
        url: "google.com/blogtest",
        likes: 2
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', token) // Works.
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
    
      const contents = response.body.map(r => r.title)
    
      expect(response.body).toHaveLength(initialLength+1)
      expect(contents).toContain(
        'NewBlogTest'
      )
  })

  test('blog without title or url', async () => {
      const InitialResponse = await api.get('/api/blogs')
      const initialLength = InitialResponse.body.length

      const newUs = {
        username: 'SuperUser',
        name: 'Superuser',
        passwordHash: 'password',
      }
      await api
        .post('/api/users')
        .send(newUs)

      const defaultUser = {
        username: "SuperUser",
        password: "password"
      }

      const loginResponse = await api.post('/api/login').send(defaultUser)
      const token = "bearer " + loginResponse.body.token

      const newBlog = {
        author: "not Thor",
        url: "google.com",
        likes: 2
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', token) // Works.
        .send(newBlog)
        .expect(400)
    
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(initialLength)
  })

  test('blog without likes set to 0', async () => {  
    const newUs = {
      username: 'SuperUser',
      name: 'Superuser',
      passwordHash: 'password',
    }
    await api
      .post('/api/users')
      .send(newUs)

    const defaultUser = {
      username: "SuperUser",
      password: "password"
    }

    const loginResponse = await api.post('/api/login').send(defaultUser)
    const token = "bearer " + loginResponse.body.token

      const newBlog = {
        title: "No Likes Blog Test",
        author: "not Maija",
        url: "google.com/blogtest"
      }
    
      const response = await api
        .post('/api/blogs')
        .set('Authorization', token) // Works.
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      expect(response.body.likes).toBe(0)
  })

  test('posting blow without token', async () => {  
      const newBlog = {
        title: "No Likes Blog Test",
        author: "not Maija",
        url: "google.com/blogtest"
      }
    
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
  })
})

describe('User auth Tests', () => {
  test('creation succeeds with a fresh username', async () => {
      const InitialResponse = await api.get('/api/users')
      const initialLength = InitialResponse.body.length
      const newUser = {
        username: 'root',
        name: 'Superuser',
        passwordHash: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialLength+1)

      const usernames = response.body.map(u => u.username)
      expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
      const InitialResponse = await api.get('/api/users')
      const initialLength = InitialResponse.body.length

      const newUser = {
        username: 'First',
        name: 'Superuser',
        passwordHash: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialLength)
  })
})

afterAll(() => {
  mongoose.connection.close()
})