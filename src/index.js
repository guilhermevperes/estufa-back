
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const serialRead = require('./SerialComunication')

mongoose.connect('mongodb+srv://guiperes:13243546@cluster0-s1smg.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

const api = express()

// var CronJob = require('cron').CronJob
// new CronJob('* * * * * *', function () {
//   console.log('You will see this message every second')
// }, 2000, true, 'America/Los_Angeles')

api.use(cors())
api.use(express.json())
api.use(require('../src/routes'))
serialRead.ReadSerialPort()

api.listen(3333)
