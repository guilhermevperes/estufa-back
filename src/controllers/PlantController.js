const Plants = require('../models/Plants')

module.exports = {
  async index (req, res) {
    const plants = await Plants.find().sort('-createdAt')
    return res.json(plants)
  },

  async store (req, res) {
    const { name, controlType, temperature, moisture, timeLightStart, timeLightEnd } = req.body

    const plant = await Plants.create({
      name,
      controlType,
      temperature,
      moisture,
      timeLightStart,
      timeLightEnd
    })

    return res.json(plant)
  },

  async getOne (req, res) {
    const { id } = req.params

    console.log('id :', id)

    const plant = await Plants.findById(id)

    return res.json({ plant })
  },

  async update (req, res) {
    const id = req.params.id
    const { name, controlType, temperature, moisture, timeLightStart, timeLightEnd } = req.body

    const updatedPlant = await Plants.updateOne({ _id: id }, {
      name: name,
      controlType: controlType,
      temperature: temperature,
      moisture: moisture,
      timeLightStart: timeLightStart,
      timeLightEnd: timeLightEnd
    })

    return res.json(updatedPlant)
  },

  async delete (req, res) {
    const id = req.params.id

    const plant = await Plants.findById({ _id: id })

    await Plants.deleteOne({ _id: id })

    return res.json(plant)
  }
}
