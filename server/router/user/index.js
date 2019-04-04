const routes = require('express').Router()
const userController = require('../../controllers/userController')

routes.post('/', userController.loginUser)


module.exports = routes