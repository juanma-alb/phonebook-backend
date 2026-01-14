const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name:{ type: String,
    required: [true, 'User name required'],
    unique: true,
    minlength: [3, 'name should be at least 3 characters'] },

  number: { required: [true, 'User phone number required'],
    type: String,
    minlength: [8, 'phone number should be at least 8 digits'],
    validate: [{
      validator: (v) => {
        return /\d{2,3}-\d+/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! numbers should be in the format 00-00000000 or 000-00000000`
    }]
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)