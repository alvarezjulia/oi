const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema(
  {
    city: String,
    name: String,
    GPS: String,
    address: String
  }
)

const Location = mongoose.model('Location', locationSchema)
module.exports = Location