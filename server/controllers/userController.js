const User = require('../models/user')
const axios = require('axios')
const { sign } = require('../helper/jwt')

const { hash, compare } = require('../helper/bcrypt')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


class UserController {

  static loginGoogleUser(req, res) {
    let payload;
    client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        const newEmail = payload.email
        return User.findOne({
          email: newEmail
        })
      })
      .then((foundUser) => {
        console.log(foundUser)
        if (foundUser) {
          const createPayload = {
            name: payload.name,
            email: payload.email
          }
          let token = sign(createPayload)
          res.status(200).json(token)
        } else {
          return User.create({
            name: payload.name,
            email: payload.email,
            password: hash(payload.at_hash, +process.env.SALT),
            avatar: payload.picture,
          })
        }
      })
      .then((loginUser) => {
        res.status(201).json(loginUser)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static loginNormalUser(req, res) {
    User.findOne({
        email: req.body.email
      })
      .then(found => {
        if (found) {
          if(compare(req.body.password, found.password)) {
            const createPayload = {
              name: req.body.name,
              email: req.body.email
            }
            let token = sign(createPayload)
            res.status(200).json(token)
          } else {
            res.status(400).json({message: `Wrong Username/Password`})
          }
        } else {
          res.status(400).json({message: `Wrong Username/Password`})
        }
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
        console.log(err)
        res.status(400).json({err})
      })
  }

}

module.exports = UserController