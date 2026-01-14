// env
require('dotenv').config()

// imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const Person = require('./models/person')
const app = express()


// db conection 
const url = process.env.MONGODB_URI
console.log('connecting to database')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


// middlewares
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token("body", (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//GET
app.get('/api/persons', (req, res, next) => {
  Person
  .find({})
  .then(persons=> { 
     res.json(persons)
})
  .catch (e => {
    console.log(e)
    next(e)
  })
})

app.get('/info', (req, res) => {
  Person
  .countDocuments({})
  .then(count => {
    const date = new Date()
    res.send(`<p> Phonebook has info for ${count} people</p> <p>${date}</p>`)
  })
})

app.get (`/api/persons/:id`, (req, res, next) =>{

  Person
  .findById (req.params.id)
  .then (person =>{
    if (person){ 
     res.json(person)
    }
    else {
      res.status(404).end()
    }
  })
  .catch (e => {
    console.log(e)
    next(e)
  })
})


//POST
app.post (`/api/persons/`, (req, res, next) =>{
const body= req.body
   
 const personObject ={
    name: body.name,
    number: body.number
 }


const newPerson = new Person (personObject)
newPerson
.save ()
.then (savedPerson => {
    res.status(201).json (savedPerson)
})
.catch (e => {
    console.log(e)
    next(e)
  })
})

//PUT
app.put (`/api/persons/:id`, (req,res, next) =>{
  const body=req.body

  const personObject = {
    name:body.name,
    number: body.number
  }

  Person
  .findByIdAndUpdate(req.params.id, personObject, { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => res.status(200).json(updatedPerson))
  .catch(e => {
    console.error(e)
    next(e)
  })
})


//DELETE
app.delete(`/api/persons/:id`, (req, res, next) => {
  Person
  .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(e => {
      console.error(e)
      next(e)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (e, req, res, next) => {
  console.error(e.message)

  if (e.name === 'CastError') {
    return (
      res.status(400)
      .send({ error: 'malformatted id' })
    )
  }
  
  if (e.name === 'ValidationError') {
    return (
      res.status(400)
      .send({ error: e.message })
    )
  }
  next(e)
  }

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})