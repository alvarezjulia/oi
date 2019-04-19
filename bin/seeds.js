// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Event = require("../models/Event")

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/oi', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
let events = [
  {
    location: "ClubX",
    event: "Awesome Techno Party",
    door: "20:00",
    begin: "21:30",
    end: "08:00",
    entry: "3.50"
  },
  {
    location: "Berghain",
    event: "Fake Party",
    door: "23:00",
    begin: "23:00",
    end: "08:00",
    entry: "10"
  },
  {
    location: "Gaterwate",
    event: "Oi release party",
    door: "18:00",
    begin: "20:00",
    end: "21:00",
    entry: "1000"
  }
]


Event.deleteMany()
.then(() => {
  return Event.create(events)
})
.then(eventsCreated => {
  console.log(`${eventsCreated.length} events created with the following id:`);
  console.log(eventsCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})