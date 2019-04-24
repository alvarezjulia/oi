const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Location = require('../models/Location')

router.get('/yourevents', (req, res) => {
    const { _id } = req.user
    User.findById({ _id })
        .populate({
            path: "addedEvents",
            model: "Event",
            populate: {
                path: "location",
                model: "Location"
            }
        })
        .then(user => {
            const yourEvents = user.addedEvents
            res.render('yourevents/yourevents', { yourEvents })
        })
        .catch(err => {
            console.error(err)
        })
})

router.get('/yourevents/add', (req, res) => {
    Location.find({})
        .then(locationNames => {
            res.render('yourevents/add', { locationNames })
        })
})

router.post('/yourevents/add', (req, res) => {
    const { _id } = req.user
    const { date, event, door, begin, end, price,location} = req.body
    
    
    Event.create({ date, event, door, begin, end, price, location })
        .then(event => {
            let eventArr = req.user.addedEvents
            eventArr.push(event._id)

            // const eventID = event._id
            // Event.findById({ eventID })
            //     .populate('location')

            User.findByIdAndUpdate({ _id }, { addedEvents: eventArr }).then(() => {
                res.redirect('/yourevents')
            })
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/yourevents/delete/:id', (req, res) => {
    const _id = req.params.id
    Event.findByIdAndRemove({ _id })
        .then(() => {
            res.redirect('/yourevents')
        })
        .catch(err => {
            console.error(err)
        })
})

router.get('/yourevents/edit/:id', (req, res) => {
    const _id = req.params.id
    Location.find({})
        .then(locationNames => {
            Event.findById({ _id })
                .then(event => {
                    res.render('yourevents/edit', { event, locationNames })
                })
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/yourevents/edit/:id', (req, res) => {
    const _id = req.params.id
    const { location, event, door, begin, end, price } = req.body
    Event.findByIdAndUpdate({ _id }, { location, event, door, begin, end, price })
        .then(() => {
            res.redirect('/yourevents')
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router
