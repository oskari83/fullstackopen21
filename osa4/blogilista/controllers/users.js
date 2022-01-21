const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.passwordHash || body.passwordHash.length < 4){
    return response.status(400).json({
        error: 'password too short or missing'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(body.passwordHash, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter