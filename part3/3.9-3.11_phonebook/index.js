const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require("cors")

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people<br/>${new Date().toUTCString()}`)
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    return response.json(person)
  }
  return response.status(404).send()
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter( p => p.id !== person.id)
    return response.status(204).send()
  }
  return response.status(404).send()
})
app.post('/api/persons', (request, response) => {
  const id = Math.trunc(Math.random() * 10000)
  const name = request.body.name
  const number = request.body.number
  const duplicated = persons.find(p => (p.name === name && p.number === number))
  let errors = [];
  if(!name || !number || duplicated){
    errors = name ? errors : errors.concat({error: 'name must be present'})
    errors = number ? errors : errors.concat({error: 'number must be present'})
    errors = duplicated ? errors.concat({error: 'new contact must be unique'}) : errors
    console.log(errors)
    return response.status(400).json(errors)
  }

  const person = {
    "id": id,
    "name": request.body.name,
    "number": request.body.number
  }
  persons = persons.concat(person)
  return response.status(200).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})