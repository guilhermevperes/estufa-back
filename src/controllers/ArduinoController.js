const serialPort = require('../SerialComunication')

module.exports = {
  async index (req, res) {
    serialPort.light(req.params.id)
    return res.json('Luz Ligada')
  }
}
