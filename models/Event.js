const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    location: {
        type: String
    },
    event: {
        type: String
    },
    door: {
        type: String
    },
    begin: {
        type: String
    },
    end: {
        type: String
    },
    entry: {
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
