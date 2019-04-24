const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
    Event.find({})
        .then(events => {
            console.log(events)
            res.render('index', { events })
        })
        .catch(err => {
            console.error('Error while finding events', err)
        })
})

module.exports = router
