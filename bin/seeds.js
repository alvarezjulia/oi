// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Event = require("../models/Event")
const Location = require("../models/Location")

const bcryptSalt = 10;

mongoose
.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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

// let events = [
//   {
//     date: "2019-04-23",
//     location: "Wilde Renate",
//     event: "Awesome Techno Party",
//     door: "20:00",
//     begin: "21:30",
//     end: "08:00",
//     price: "3.50"
//   },
//   {
//     date: "2019-04-23",
//     location: "Berghain",
//     event: "Testparty 1232341",
//     door: "18:00",
//     begin: "21:00",
//     end: "08:00",
//     price: "3.50"
//   },
//   {
//     date: "2019-04-23",
//     location: "Tresor",
//     event: "Tresorparty",
//     door: "20:00",
//     begin: "21:30",
//     end: "08:00",
//     price: "3.50"
//   },
//   {
//     date: "2019-04-23",
//     location: "Sisyphos",
//     event: "Sisyphos Party",
//     door: "20:00",
//     begin: "21:30",
//     end: "08:00",
//     price: "13.50"
//   },
//   {
//     date: "2019-04-24",
//     location: "Berghain",
//     event: "Berhain Party day2",
//     door: "20:00",
//     begin: "21:30",
//     end: "08:00",
//     price: "15.50"
//   }
// ]

let locations = [
  {
    city: "Zürich",
    name: "Moods",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Bogen F",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Exil",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "El Lokal",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Stall 6",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Hafenkneipe",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Helsinki",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Papiersaal",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Mascotte",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Sender",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Kaufleuten",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Mehrspur",
    GPS: "129803120983",
    address: "teststreet1234",
  },
  {
    city: "Zürich",
    name: "Rote Fabrik",
    GPS: "129803120983",
    address: "teststreet1234",
  },
]



Location.deleteMany()
.then(() => {
  return Location.create(locations)
})
.then(locationsCreated => {
  console.log(`${locationsCreated.length} locations created with the following id:`);
  console.log(locationsCreated.map(u => u._id));
})

// Event.deleteMany()
  // .then(() => {
  //   return Event.create(events)
  // })
  // .then(eventsCreated => {
  //   console.log(`${eventsCreated.length} events created with the following id:`);
  //   console.log(eventsCreated.map(u => u._id));
  // })

  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })

  .catch(err => {
    mongoose.disconnect()
    throw err
  })