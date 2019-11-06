const registerDataApi = require('./api/arduinoApi')
const getData = require('./api/arduinoApi')
const moment = require('moment')

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600, dataBits: 8, parity: 'none', stopBits: 1, flowControl: false })
const parser = port.pipe(new Readline({ delimiter: '\n' }))

const arrayToSend = []
const objToSend = {}

module.exports = {
  light (command) {
    port.write(command)
  },
  ReadSerialPort (io) {
    port.on('open', () => {
      console.log('serial port open')
    })

    parser.on('data', data => {
      const serialDataArray = data.split(',')

      const dataToSend = {
        name: moment(Date.now()).format('HH:mm:ss').toString(),
        sp: parseFloat(serialDataArray[0]),
        pv: parseFloat(serialDataArray[1]),
        mv: parseFloat(serialDataArray[2])
      }

      // registerDataApi.registeDataApi(serialDataArray[5], serialDataArray[4], parseFloat(serialDataArray[1]), parseFloat(serialDataArray[2]), 0)
      // .then(result => {
      arrayToSend.push(dataToSend)
      // if (arrayToSend.length > 6) {
      //   arrayToSend.shift()
      // }
      objToSend.setPoint = serialDataArray[0]
      objToSend.temperature = serialDataArray[1]
      objToSend.dataToPLot = arrayToSend
      objToSend.mv = serialDataArray[2]
      objToSend.controlType = serialDataArray[4]
      objToSend.plantId = serialDataArray[5]
      io.emit('data', objToSend)

      console.log(serialDataArray)
      // })
    })
  }

}
// const temperature = parseFloat(serialDataArray[2])
// const lightness = parseFloat(serialDataArray[3])
// const moisture = parseFloat(serialDataArray[4])
// const setPoint = parseFloat(serialDataArray[5])
// registerDataApi(serialDataArray[0], serialDataArray[1], temperature, lightness, moisture).then(result => {
//   console.log(result)
// })

// Read the port data

// module.exports = function ReadSerialPort () {
//   port.on('open', () => {
//     console.log('serial port open')
//   })

//   parser.on('data', data => {
//     const serialDataArray = data.split(',')
//     const temperature = parseFloat(serialDataArray[2])
//     const lightness = parseFloat(serialDataArray[3])
//     const moisture = parseFloat(serialDataArray[4])
//     // registerDataApi(serialDataArray[0], serialDataArray[1], temperature, lightness, moisture).then(result => {
//     //   console.log(result)
//     // })
//     port.write('0')
//     // getData().then(result => {
//     //   console.log(result)
//     // })
//     console.log(data)
//   })
// }
