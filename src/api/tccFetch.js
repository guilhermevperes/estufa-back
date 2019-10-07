
const URL_BASE = 'http://localhost:3333'
const fetch = require('node-fetch')

module.exports = function tccFetch (url, options, isAppConnected = true, customHeader, marvinHeader) {
  if (isAppConnected) {
    const defaultHeader = { headers: { 'Content-Type': 'application/json' } }

    options = { ...defaultHeader, ...options }
    const fetchUrl = url.slice(0, 4) === 'http' ? url : `${URL_BASE + url}`
    return fetch(fetchUrl, options)
      .then(async response => {
        const result = ({ error: !response.ok, data: options.headers['Content-Type'] === 'application/json' ? await response.json() : await response.text(), response, request: { url, options } })
        return result
      })
  }
  return Promise.resolve({ error: true, data: { erros: [{ mensagem: 'Sem conexão' }] }, request: { url, options } })
}
