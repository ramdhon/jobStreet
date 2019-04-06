const bcrypt = require('bcrypt')

module.exports = {
  hash : function(password) {
   return bcrypt.hashSync(password, +process.env.SALT)
  },
  compare: function(password, hash) {
    return data = bcrypt.compareSync(password, hash)
  }
}


