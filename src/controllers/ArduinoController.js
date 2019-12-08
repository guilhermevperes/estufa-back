const serialPort = require('../SerialComunication')

module.exports = {
  async setControleData (req, res) {
    const { controlType, plantId, temperature, moisture, timeLightStart, timeLightEnd } = req.body
    // const stringCommand = `${controlType},${plantId},${temperature},${moisture},${lightness}`
    console.log(req.body)
    const stringCommand = `${controlType},${plantId},${temperature},${moisture}`
    serialPort.write('a')
    serialPort.write(stringCommand)
    return res.json({ ok: true })
  },

  async lighControl (req, res) {
    const { c } = req.params
    console.log(c)
    serialPort.write(c)
    return res.json('Comando Luz Enviado!')
  },

  async turnOffControl (req, res) {
    serialPort.write('d')
    return res.json('Controle Desligado')
  }
}
