const mongoose = require('mongoose')

const PlantsSchema = mongoose.Schema({
  name: {
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
  moisture: {
    type: Number,
    required: true
  },
  timeLightStart: {
    type: String,
    required: true
  },
  timeLightEnd: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Plants', PlantsSchema)
