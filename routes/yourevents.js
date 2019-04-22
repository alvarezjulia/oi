const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')

router.get('/yourevents', (req, res) => {
    // const { _id } = req.user
    res.render('yourevents/yourevents')
})

router.get('/yourevents/add', (req, res) => {
    res.render('yourevents/add')
})

router.post('/yourevents/add', (req, res) => {
    const { _id } = req.user
    const { location, event, door, begin, end, entry } = req.body
    Event.create({ location, event, door, begin, end, entry })
        .then(event => {
            let eventArr = req.user.addedEvents
            eventArr.push(event._id)

            User.findByIdAndUpdate({ _id }, { addedEvents: eventArr }).then(() => {
                res.redirect('/yourevents')
            })
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router
