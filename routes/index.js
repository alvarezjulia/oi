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
    const dateOfAfterTomorrow = moment(new Date())
        .add(2, 'day')
        .format('DD.MM.YYYY')
    Location.find({})
        .then(locationNames => {
            Event.find({})
                .populate('location')
                .then(events => {
                    eventsTodayArr = events.filter(el => {
                        if (el.date === dateOfToday) {
                            let going = false

                            if (req.user) {
                                going = req.user.goingEvents
                                    .map(element => element + '')
                                    .includes(el._id + '')
                            }
                            el.going = going
                            return el
                        }
                    })
                    eventsTomorrowArr = events.filter(el => {
                        if (el.date === dateOfTomorrow) {
                            let going = false

                            if (req.user) {
                                going = req.user.goingEvents
                                    .map(element => element + '')
                                    .includes(el._id + '')
                            }
                            el.going = going
                            return el
                        }
                    })
                    eventsAfterTomorrowArr = events.filter(el => {
                        if (el.date === dateOfAfterTomorrow) {
                            let going = false

                            if (req.user) {
                                going = req.user.goingEvents
                                    .map(element => element + '')
                                    .includes(el._id + '')
                            }
                            el.going = going
                            return el
                        }
                    })

                    res.render('index', {
                        locationNames,
                        eventsTodayArr,
                        eventsTomorrowArr,
                        eventsAfterTomorrowArr
                    })
                })
        })
        .catch(err => {
            console.error('Error while finding events', err)
        })
})

router.post('/', (req, res, next) => {
    const filteredEvents = Object.values(req.body)
    const dateOfToday = moment(new Date()).format('DD.MM.YYYY')
    const dateOfTomorrow = moment(new Date())
        .add(1, 'day')
        .format('DD.MM.YYYY')
    const dateOfAfterTomorrow = moment(new Date())
        .add(2, 'day')
        .format('DD.MM.YYYY')
    Location.find({})
        .then(locationNames => {
            Event.find({ location: { $in: filteredEvents } })
                .populate('location')
                .then(events => {
                    eventsTodayArr = events.filter(el => el.date === dateOfToday)
                    eventsTomorrowArr = events.filter(el => el.date === dateOfTomorrow)
                    eventsAfterTomorrowArr = events.filter(el => el.date === dateOfAfterTomorrow)

                    res.render('index', {
                        eventsTodayArr,
                        eventsTomorrowArr,
                        eventsAfterTomorrowArr,
                        locationNames
                    })
                })
        })
        .catch(err => {
            console.error('Error while finding events', err)
        })
})

module.exports = router
