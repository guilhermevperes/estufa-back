const mongoose = require('mongoose')

const PlantsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  lightness: {
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

module.exports = mongoose.model('Plants', PlantsSchema)
