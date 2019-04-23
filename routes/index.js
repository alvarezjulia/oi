const express = require('express');
const router  = express.Router();
const Event = require("../models/Event");



/* GET home page */
router.get('/', (req, res, next) => {
  Event.find({})
  .then (events => {
    res.render('index', {events});
  })
  .catch(err => {
    console.error("Error while finding events", err)
  });
});

router.post('/', (req, res, next) => {
  const filteredEvents = Object.values(req.body)
  Event.find({location: {$in: filteredEvents}})
  .then (events => {
    res.render('index', {events});
  })
  .catch(err => {
    console.error("Error while finding events", err)
  });
})

module.exports = router;
