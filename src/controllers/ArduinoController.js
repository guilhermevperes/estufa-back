const serialPort = require('../SerialComunication')

module.exports = {
  async setControleData (req, res) {
    const { controlType, plantId, temperature, moisture, timeLightStart, timeLightEnd } = req.body
    // const stringCommand = `${controlType},${plantId},${temperature},${moisture},${lightness}`
    console.log(req.body)
    const stringCommand = `${controlType},${plantId},${temperature},${moisture}`
    serialPort.light('a')
    serialPort.light(stringCommand)
    return res.json({ ok: true })
  },

  async lighControl (req, res) {
    const { c } = req.params
    console.log(c)
    serialPort.light(c)
    return res.json('Comando Luz Enviado!')
  }
}
