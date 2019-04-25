const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    date: {
        type: String,
        match: /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g // format DD.MM.YYYY
    },
    // location: {
    //     type: String
    // },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
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
    price: {
        type: Number
    }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
