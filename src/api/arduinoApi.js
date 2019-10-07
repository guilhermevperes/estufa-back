const tccFetch = require('./tccFetch')

module.exports = function registeDataApi (plantId, controlType, temperature, lightness, moisture) {
  const urlRegister = '/registers'
  const objectReturn = {}
  const options = {
    method: 'POST',
    body: JSON.stringify({
      plantId, controlType, temperature, lightness, moisture
    })
  }

  return tccFetch(urlRegister, options, true)
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

module.exports = function getData () {
  const urlRegister = '/registers'
  const objectReturn = {}
  const options = {
    method: 'GET'
  }

  return tccFetch(urlRegister, options, true)
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
