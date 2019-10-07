const registerDataApi = require('./api/arduinoApi')
const getData = require('./api/arduinoApi')

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600, dataBits: 8, parity: 'none', stopBits: 1, flowControl: false })
const parser = port.pipe(new Readline({ delimiter: '\n' }))
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

module.exports = {
  light (command) {
    port.write(command)
  },
  ReadSerialPort () {
    port.on('open', () => {
      console.log('serial port open')
    })

    parser.on('data', data => {
      const serialDataArray = data.split(',')
      const temperature = parseFloat(serialDataArray[2])
      const lightness = parseFloat(serialDataArray[3])
      const moisture = parseFloat(serialDataArray[4])
      // registerDataApi(serialDataArray[0], serialDataArray[1], temperature, lightness, moisture).then(result => {
      //   console.log(result)
      // })
      console.log(data)
    })
  }

}
