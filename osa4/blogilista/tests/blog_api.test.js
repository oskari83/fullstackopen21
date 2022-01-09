const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are zero notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(10)
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

    const newBlog = {
      title: "test2",
      author: "not Oskari",
      url: "google.com",
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialLength+1)
    expect(contents).toContain(
      'test2'
    )
})

test('blog without title or url', async () => {
    const InitialResponse = await api.get('/api/blogs')
    const initialLength = InitialResponse.body.length

    const newBlog = {
      author: "not Thor",
      url: "google.com",
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialLength)
})

test('blog without likes set to 0', async () => {    
    const newBlog = {
      title: "no likes",
      author: "not Maija",
      url: "google.com"
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})