const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

let numbers = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
}
]

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${numbers.length} people</p> <p>${new Date()}</p>`)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(numbers)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const cNum = numbers.find(num => num.id === id)
    
    if (cNum) {
      response.json(cNum)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    nums = numbers.filter(num => num.id !== id)
  
    response.status(204).end()
})

const generateId = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

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

    if(numbers.some(element => element.name === body.name )){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
  
    const number = {
      name: body.name,
      number: body.number,
      date: new Date(),
      id: generateId(1,9999999),
    }
  
    numbers = numbers.concat(number)
    response.json(number)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})