
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const serialRead = require('./SerialComunication')
const socketio = require('socket.io')
const http = require('http')

const api = express()
const server = http.Server(api)
const io = socketio(server)

mongoose.connect('mongodb+srv://guiperes:13243546@cluster0-s1smg.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

io.on('connection', socket => {
  console.log('User connected', socket.id)
})

// var CronJob = require('cron').CronJob
// new CronJob('* * * * * *', function () {
//   console.log('You will see this message every second')
// }, 2000, true, 'America/Los_Angeles')

serialRead.ReadSerialPort(io)
api.use(cors())
api.use(express.json())
api.use(require('../src/routes'))

server.listen(3333)
