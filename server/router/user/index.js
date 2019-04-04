const routes = require('express').Router()
const userController = require('../../controllers/userController')

routes.post('/', userController.loginUser) //login
routes.post('/register', userController.createUser) //register


module.exports = routes