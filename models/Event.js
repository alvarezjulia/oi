const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    location: String,
    event: String,
    door: String,
    begin: String,
    end: String,
    entry: String
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
