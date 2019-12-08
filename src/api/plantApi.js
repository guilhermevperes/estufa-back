const tccFetch = require('./tccFetch')

module.exports = {
  getPlant (plantId) {
    const urlRegister = `/plants/${plantId}`
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
