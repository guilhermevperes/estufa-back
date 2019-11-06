const mongoose = require('mongoose')

const RegisterSchema = mongoose.Schema({
  plantId: {
    type: String,
    required: true
  },
  controlType: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  mv: {
    type: Number,
    required: true
  },
  moisture: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Register', RegisterSchema)
