const express = require('express');
const router  = express.Router();
const Event = require("../models/Event");

/* GET home page */
router.get('/', (req, res, next) => {
  Event.find({})
  .then (events => {
    console.log(events)
    res.render('index', {events});
  })
  .catch(err => {
    console.error("Error while finding movies", err)
  });
});

module.exports = router;
