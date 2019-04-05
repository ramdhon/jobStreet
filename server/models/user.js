const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helper/bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    validate : [{
      validator : function(value) {
        if(value.length === 0) {
          return false
        }
      },
      message : `Username cannot be empty`
    }]
  },
  email: {
    type: String,
    validate: [{
      validator: function (value) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value)
      },
      message: `invalid email format`
    }, {
      validator: function (value) {
        return User.findOne({
            _id: {
              $ne: this._id
            },
            email: value
          })
          .then(found => {
            if (found) {
              return false
            }
          })
      },
      message: `email already registered`
    }]
  },
  password: {
    type: String,
    validate : [{
      validator : function(value) {
        if(value.length === 0) {
          return false
        }
      },
      message : `Password cannot be empty`
    }]
  },
  avatar: String
})

UserSchema.post('validate', function(doc, next) {
  doc.password = hash(doc.password)
  next()
})



let User = mongoose.model('User', UserSchema)
module.exports = User