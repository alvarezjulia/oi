const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    date: {
        type: String,
        match: /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/ // format DD.MM.YYYY
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    event: {
        type: String
    },
    description: {
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
