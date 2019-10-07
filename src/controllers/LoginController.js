const User = require('../models/Users')

module.exports = {
  async store (req, res) {
    console.log('teste')
    const { name, password } = req.body
    const user = await User.find({ name: name })
    console.log('passou')
    if (user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ status: '2', message: '02 - incorrect username and password' })
    }
    return res.status(200).json({ status: '1', message: '01 - success', user: user[0] })
  }
}
