const jwt = require('jsonwebtoken')

module.exports = {
  sign : function(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY)
  },

  verify: function(token) {
    return jwt.verify(token, process.env.SECRET_KEY)
  }
}