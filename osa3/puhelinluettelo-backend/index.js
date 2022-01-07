const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()
const cors = require('cors')
const NumberMD = require('./models/NumberMongo')

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))

app.get('/info', (req, res) => {
  NumberMD.find({}).then(result => {
    res.send(`<p>Phonebook has info for ${result.length} people</p> <p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  NumberMD.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  NumberMD.findById(request.params.id)
  .then(number =>{
    if(number){
      response.json(number)
    } else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  NumberMD.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }
  
    const number = new NumberMD({
      name: body.name,
      number: body.number,
      date: new Date()
    })
    
    number.save().then(savedNumber => {
      response.json(savedNumber)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const number = {
    name: body.name,
    number: body.number,
  }

  NumberMD.findByIdAndUpdate(request.params.id, number, { new: true })
    .then(updatedNumber => {
      response.json(updatedNumber)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})