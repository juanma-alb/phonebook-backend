const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())

morgan.token("body", (req, res) =>{
    return JSON.stringify(req.body)
} )
app.use (morgan(':method :url :status :res[content-length] - :response-time ms :body' ))

let persons=
[
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


//GET
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get (`/info`,( req, res) => {

const date = new Date ()

    res.send (`<p> Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})


app.get (`/api/persons/:id`, (req, res) =>{

const person= persons.find (person => person.id === Number(req.params.id))  

if (person)
res.json (person)
else 
{
return res.status(404).json({
    error: "this person doesn't exist"
})}
})

//POST

app.post (`/api/persons/`, (req, res) =>{
const body= req.body

if (!body.name || !body.number){
    return res.status (400).json ({
        error: "name or number is missing"
    })
}
   
 const personObject ={
    id: Math.floor(Math.random()*1000000),
    name: body.name,
    number: body.number
 }

 if (persons.some (p => p.name === personObject.name)){
    return res.status (400).json ({
        error: "name must be unique"
    })
}
persons= persons.concat (personObject)
res.json (personObject)

})

//DELETE

app.delete (`/api/persons/:id`, (req, res) =>{
 const id = Number(req.params.id)  

persons= persons.filter (person => person.id !== id)

res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})