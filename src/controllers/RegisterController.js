const Registers = require('../models/Registers')
const Plants = require('../models/Plants')

module.exports = {
  async index (req, res) {
    const plantId = req.params.id
    console.log('plantId', plantId)
    const registers = await Registers.find({ plantId: plantId }).sort('createdAt')

    return res.json(registers)
  },

  async store (req, res) {
    const { plantId, controlType, temperature, mv, moisture } = req.body

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
      moisture
    })

    return res.json(register)
  },

  async delte (req, res) {
    const id = req.params.id

    const deletedRegister = await Registers.deleteOne({ _id: id })

    return res.json(deletedRegister)
  }
}
