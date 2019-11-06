const express = require('express')

const routes = express.Router()

const PlantController = require('./controllers/PlantController')
const RegisterController = require('./controllers/RegisterController')
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
const ArduinoController = require('./controllers/ArduinoController')

routes.get('/plants', PlantController.index)
routes.post('/plants', PlantController.store)
routes.put('/plants/:id', PlantController.update)
routes.delete('/plants/:id', PlantController.delete)

routes.get('/registers/:id', RegisterController.index)
routes.post('/registers', RegisterController.store)
routes.delete('/registers/:id', RegisterController.delte)

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)
routes.post('/users/login', LoginController.store)

routes.post('/arduino', ArduinoController.setControleData)
routes.post('/arduino/:c/light', ArduinoController.lighControl)

module.exports = routes
