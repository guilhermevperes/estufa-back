const Registers = require('../models/Registers')
const Plants = require('../models/Plants')
const moment = require('moment')

module.exports = {
  async index (req, res) {
    const plantId = req.params.id
    console.log('plantId', plantId)
    const registers = await Registers.find({ plantId: plantId }).sort('createdAt')

    return res.json(registers)
  },

  async store (req, res) {
    const { plantId, controlType, temperature, mv, error, moisture } = req.body

    if (plantId.length !== 24) {
      return res.json({ message: 'This plant does not exists' })
    }

    const plantExists = await Plants.findOne({ _id: plantId })

    if (!plantExists) {
      return res.json({ message: 'This plant does not exists' })
    }

    const register = await Registers.create({
      plantId,
      controlType,
      temperature,
      mv,
      error,
      moisture
    })

    return res.json(register)
  },

  async delte (req, res) {
    const id = req.params.id

    const deletedRegister = await Registers.deleteOne({ _id: id })

    return res.json(deletedRegister)
  },

  async delteAll (req, res) {
    const id = req.params.id

    const deletedRegister = await Registers.deleteMany({ plantId: id })

    return res.json(deletedRegister)
  },
  async getRegisterByIds (req, res) {
    const { firstId, secondId } = req.body

    // const firstRegister = await Registers.find({ plantId: '5dcb5de3ab5f023e4f487299' }).sort('createdAt')
    // const secondRegister = await Registers.find({ plantId: '5dcb600de6ef24435590d326' }).sort('createdAt')

    const firstRegister = await Registers.find({ plantId: '5dccbcf2bd2e414e9724cfe8' }).sort('createdAt')
    const secondRegister = await Registers.find({ plantId: '5dccbd0cbd2e414e9724cfe9' }).sort('createdAt')

    const registerFiltered = firstRegister.filter(item => moment(item.createdAt).isAfter('2019-11-14T10:29:16.118Z'))

    const registerFiltered2 = secondRegister.filter(item => moment(item.createdAt).isAfter('2019-11-14T11:07:42.889Z'))

    const allData = registerFiltered.concat(registerFiltered2)

    // const firstRegister = await Registers.find({ plantId: '5dccedcfe380f81c2b1b99f3' }).sort('createdAt')
    // const secondRegister = await Registers.find({ plantId: '5dccede3e380f81c2b1b9a0e' }).sort('createdAt')

    // const registerFiltered = firstRegister.filter(item => moment(item.createdAt).isAfter('2019-11-14T10:29:16.118Z'))

    // const registerFiltered2 = secondRegister.filter(item => moment(item.createdAt).isAfter('2019-11-14T09:30:00.415Z'))

    // const allData = firstRegister.concat(registerFiltered2)

    const teste = allData.map(result => ({ pv: result.temperature, name: moment(result.createdAt, 'MM-Ss'), sp: result.sp }))

    return res.json({ teste })
  }
}
