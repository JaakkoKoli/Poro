if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI
let secret = process.env.secret
let client_id = process.env.CLIENT_ID
let no_weapon = process.env.NO_WEAPON_ID
let no_misc = process.env.NO_MISC_ID
let no_helmet = process.env.NO_HELMET_ID
let no_footwear = process.env.NO_FOOTWEAR_ID

module.exports = {
  mongoUrl,
  port,
  secret,
  client_id,
  no_weapon,
  no_misc,
  no_helmet,
  no_footwear
}