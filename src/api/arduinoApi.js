const tccFetch = require('./tccFetch')

module.exports = {
  registeDataApi (plantId, controlType, temperature, mv, moisture) {
    const urlRegister = '/registers'
    const objectReturn = {}
    const options = {
      method: 'POST',
      body: JSON.stringify({
        plantId, controlType, temperature, mv, moisture
      })
    }

    return tccFetch.tccFetch(urlRegister, options, true)
      .then(({ error, data, response, request }) => {
        if (error || data.erros) {
          objectReturn.status = 'error'
          objectReturn.data = data
          return objectReturn
        } else {
          objectReturn.status = 'success'
          objectReturn.data = data
          return objectReturn
        }
      }).catch(error => {
        objectReturn.status = 'error catch'
        objectReturn.error = error
        return objectReturn
      })
  },
  getData () {
    const urlRegister = '/registers'
    const objectReturn = {}
    const options = {
      method: 'GET'
    }

    return tccFetch.tccFetch(urlRegister, options, true)
      .then(({ error, data, response, request }) => {
        if (error || data.erros) {
          objectReturn.status = 'error'
          objectReturn.data = data
          return objectReturn
        } else {
          objectReturn.status = 'success'
          objectReturn.data = data
          return objectReturn
        }
      }).catch(error => {
        objectReturn.status = 'error catch'
        objectReturn.error = error
        return objectReturn
      })
  }
}
