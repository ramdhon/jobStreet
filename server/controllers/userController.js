const User  = require('../models/user')
const axios = require('axios')
const { sign } = require('../helper/jwt')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


class UserController{

  static loginUser(req, res) {
    let payload;
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
      .then( ticket => {
        payload = ticket.getPayload()
        const newEmail = payload.email
        return User.findOne({
          email : newEmail
        })
      })
      .then((foundUser) => {
        if(foundUser) {
          const createPayload = {
            name: payload.name,
            email : payload.email
          }
          let token = sign(createPayload)
          res.status(200).json(token)
        } else {
         return User.create({
            name : payload.name,
            email : payload.email,
            password : 1234,
            avatar : payload.picture,
          })
        }
      })
      .then( (loginUser) => {
        res.status(201).json(loginUser)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
    
  }

  static createUser(req, res) {
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    .then((newUser) => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  }

}

module.exports = UserController