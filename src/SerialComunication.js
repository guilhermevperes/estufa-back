const registerDataApi = require('./api/arduinoApi')
const plantApi = require('./api/plantApi')
const getData = require('./api/arduinoApi')
const moment = require('moment')

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600, dataBits: 8, parity: 'none', stopBits: 1, flowControl: false })
const parser = port.pipe(new Readline({ delimiter: '\n' }))

const arrayToSend = []
const objToSend = {}

module.exports = {
  write (command) {
    port.write(command)
  },
  ReadSerialPort (io) {
    port.on('open', () => {
      console.log('serial port open')
    })

    parser.on('data', async data => {
      const serialDataArray = data.split(',')

      const dataToSend = {
        name: moment(Date.now()).format('HH:mm:ss').toString(),
        sp: parseFloat(serialDataArray[0]),
        pv: parseFloat(serialDataArray[1]),
        mv: parseFloat(serialDataArray[2]),
        moisture: parseFloat(serialDataArray[7])
      }

      registerDataApi.registeDataApi(serialDataArray[5], serialDataArray[4], parseFloat(serialDataArray[1]), parseFloat(serialDataArray[2]), parseFloat(serialDataArray[7]), parseFloat(serialDataArray[6]))
        .then(async result => {
          arrayToSend.push(dataToSend)
          if (arrayToSend.length > 200) {
            arrayToSend.shift()
          }

          const plantData = await plantApi.getPlant(serialDataArray[5])
          const timeStart = plantData.data.plant.timeLightStart
          const timeEnd = plantData.data.plant.timeLightEnd
          const dateNow = Date.now()
          if (moment(dateNow).subtract(1, 'hour').format('HH:mm') >= timeStart && moment(dateNow).subtract(1, 'hour').format('HH:mm') <= timeEnd) {
            this.write('b')
          } else {
            this.write('c')
          }
          objToSend.setPoint = serialDataArray[0]
          objToSend.temperature = serialDataArray[1]
          objToSend.dataToPLot = arrayToSend
          objToSend.mv = serialDataArray[2]
          objToSend.moisture = serialDataArray[7]
          objToSend.controlType = serialDataArray[4]
          objToSend.plantId = serialDataArray[5]
          io.emit('data', objToSend)

          console.log(serialDataArray)
        })
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
