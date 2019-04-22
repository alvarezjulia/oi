const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')

router.get('/yourevents', (req, res) => {
    const { _id } = req.user

    User.findById({ _id })
        .populate('addedEvents')
        .then(user => {
            const yourEvents = user.addedEvents
            res.render('yourevents/yourevents', { yourEvents })
        })
        .catch(err => {
            console.error(err)
        })
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
    console.log(_id)
    Event.findById({ _id })
        .then(event => {
            res.render('yourevents/edit', event)
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router
