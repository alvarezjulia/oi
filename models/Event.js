const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    date: {
        type: Date
    },
    // location: {
    //     type: String
    // },
    location: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    ],
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
