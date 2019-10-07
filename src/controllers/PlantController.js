const Plants = require('../models/Plants')

module.exports = {
  async index (req, res) {
    const plants = await Plants.find().sort('-createdAt')
    return res.json(plants)
  },

  async store (req, res) {
    const { name, temperature, lightness, moisture } = req.body

    const plant = await Plants.create({
      name,
      temperature,
      lightness,
      moisture
    })

    return res.json(plant)
  },

  async update (req, res) {
    const id = req.params.id
    const { name, temperature, lightness, moisture } = req.body

    const updatedPlant = await Plants.updateOne({ _id: id }, {
      name: name,
      temperature: temperature,
      lightness: lightness,
      moisture: moisture
    })

    return res.json(updatedPlant)
  },

  async delete (req, res) {
    const id = req.params.id

    const plantDeleted = await Plants.deleteOne({ _id: id })

    return res.json(plantDeleted)
  }
}
