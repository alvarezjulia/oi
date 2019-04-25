const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const Location = require('../models/Location')
const moment = require('moment')

/* GET home page */
router.get('/', (req, res, next) => {
    const dateOfToday = moment(new Date()).format('DD.MM.YYYY')
    const dateOfTomorrow = moment(new Date())
        .add(1, 'day')
        .format('DD.MM.YYYY')
    Location.find({})
        .then(locationNames => {
            Event.find({ date: dateOfToday })
                .populate('location')
                .then(events => {
                    eventsObj = events.map(oneEvent => {
                        let going = false
                        if (req.user) {
                            going = req.user.goingEvents.map(el => el + '').includes(oneEvent._id + '')
                        }
                        const { _id, date, event, description, location } = oneEvent
                        return { _id, date, event, description, location, going }
                    })
                    res.render('index', { eventsObj, locationNames })
                })
        })
        .catch(err => {
            console.error('Error while finding events', err)
        })
})

router.post('/', (req, res, next) => {
    const dateOfToday = moment(new Date()).format('DD.MM.YYYY')
    const filteredEvents = Object.values(req.body)
    Location.find({})
        .then(locationNames => {
            Event.find({ $and: [{ location: {$in: filteredEvents } }, { date: dateOfToday }] })
                .populate('location')
                .then(eventsObj => {
                    res.render('index', { eventsObj, locationNames })
                })
        })
        .catch(err => {
            console.error('Error while finding events', err)
        })
})

module.exports = router
