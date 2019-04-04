const routes = require('express').Router()
const userController = require('../../controllers/userController')

routes.post('/', userController.loginGoogleUser) //login
routes.post('/userlogin', userController.loginNormalUser) //login
routes.post('/register', userController.createUser) //register


module.exports = routes