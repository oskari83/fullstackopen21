const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/login', middleware.tokenExtractor, loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)

if (process.env.NODE_ENV === 'development') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app