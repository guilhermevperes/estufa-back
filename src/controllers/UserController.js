const User = require('../models/Users')

module.exports = {
  async index (req, res) {
    const user = await User.find().sort('-createdAt')
    return res.json(user)
  },

  async store (req, res) {
    const { name, password } = req.body

    const userExists = await User.find({ name: name })

    if (userExists[0]) {
      return res.status(202).json({ status: '3', message: '03 - user already existis' })
    }

    const user = await User.create({
      name,
      password
    })

    return res.status(200).json({ status: '1', user })
  },

  async update (req, res) {
    const id = req.params.id
    const { name, password } = req.body

    await User.updateOne({ _id: id }, {
      name: name,
      password: password
    })

    const userUpdated = await User.findById(id)

    return res.json(userUpdated)
  },

  async delete (req, res) {
    const id = req.params.id

    const user = await User.findById(id)

    await User.deleteOne({ _id: id })

    return res.json(user)
  }
}
