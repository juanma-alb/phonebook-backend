const mongoose = require('mongoose')
const password = process.argv[2] 
const url = `mongodb+srv://juanmalblt_db_user:${password}@cluster0.pqkl6en.mongodb.net/phonebook-backend?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema ({
    name: String,
    number: String
})

const Person = mongoose.model("person", personSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person ({
        name: name,
        number: number
    })
    person.save().then (() =>{
        console.log (`added ${person.name} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
Person.find ({}).then (result =>{
result.forEach(person => {
    console.log (`Phonebook:
-name: "${person.name}" -number: "${person.number}"`)
})
mongoose.connection.close()
})
}









