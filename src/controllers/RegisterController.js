const Registers = require('../models/Registers')
const Plants = require('../models/Plants')

module.exports = {
  async index (req, res) {
    const registers = await Registers.find().sort('createdAt')

    return res.json(registers)
  },

  async store (req, res) {
    const { plantId, controlType, temperature, lightness, moisture } = req.body

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
      lightness,
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
