const express = require('express')
const router = express.Router()
const request = require("request")
const Event = require('../models/Event')
const Location = require('../models/Location')
const moment = require("moment")



/* GET home page */
router.get('/', (req, res, next) => {
  const dateofToday = moment(new Date()).format("DD.MM.YYYY")
  console.log(dateofToday)
  Location.find({})
    .then(locationNames => {
      Event.find({date: dateofToday})
        .populate('location')
        .then(events => {
          console.log("displayed events:")
          console.log(events)

          console.log(dateofToday)

          res.render('index', { events, locationNames })
        })
    })

    .catch(err => {
      console.error('Error while finding events', err)
    })
})

router.post('/', (req, res, next) => {
  const filteredEvents = Object.values(req.body)
  Location.find({})
    .then(locationNames => {
      Event.find({$and: [{ location: {$in: filteredEvents }}, {date: "24.04.2019"}]})
        .populate('location')
        .then(events => {
          res.render('index', { events, locationNames })
        })
    })
    .catch(err => {
      console.error('Error while finding events', err)
    })
})

module.exports = router
