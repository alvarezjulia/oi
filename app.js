require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const CronJob = require('cron').CronJob
const Event = require('./models/Event')
const Location = require('./models/Location')
const { request } = require('graphql-request')
const moment = require('moment')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    })

const app_name = require('./package.json').name
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

new CronJob(
    //12 : '00 00 12 * * *'
    // One minute: 0 */1 * * * *
    '0 0 */18 * * *',
    function() {
        console.log(`Hello`)
        const dateOfYesterday = moment(new Date())
            .subtract(1, 'day')
            .format('DD.MM.YYYY')

        Event.deleteMany({ date: dateOfYesterday })
            .then()
            .catch(err => {
                console.error(err)
            })

        const query = `{
            allFutureEvents(city: "Zürich") {
              date
              locationName
              details {
                title
                description
                url
                }
               }
            }`

        request('https://api.heute.sg/graphql', query)
            .then(data => {
                const dateAfterThreeDays = moment(new Date())
                    .add(1, 'day')
                    .format('DD.MM.YYYY')

                const eventsAfterThreeDaysArr = data.allFutureEvents.filter(el => {
                    if (el.date === dateAfterThreeDays) return el
                })

                eventsAfterThreeDaysArr.forEach(el => {
                    const date = el.date
                    const event = el.details.title
                    const location = el.locationName
                    const description = el.details.description

                    Location.find({ name: location })
                        .then(oneLocation => {
                            if (oneLocation[0]) {
                                let locationId = oneLocation[0]._id

                                Event.create({ date, event, description, location: locationId })
                                    .then(() => {
                                        //console.log('Events created')
                                    })
                                    .catch(err => {
                                        console.error(err)
                                    })
                            }
                        })
                        .catch(err => {
                            console.error(err)
                        })
                })
            })

            .catch(err => {
                console.error(err)
            })
    },
    null,
    true,
    'America/Los_Angeles'
)

// request('https://api.heute.sg/graphql', query)
//     .then(data => {
//         console.log(data.allFutureEvents)
//     })
//     .catch(err => {
//         console.error(err)
//     })

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Express View engine setup

app.use(
    require('node-sass-middleware')({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        sourceMap: true
    })
)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

hbs.registerHelper('ifUndefined', (value, options) => {
    if (arguments.length < 2) throw new Error('Handlebars Helper ifUndefined needs 1 parameter')
    if (typeof value !== undefined) {
        return options.inverse(this)
    } else {
        return options.fn(this)
    }
})

// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';

// Enable authentication using session + passport
app.use(
    session({
        secret: 'irongenerator',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)
app.use(flash())
require('./passport')(app)

const loginCheck = (req, res, next) => {
    app.locals.loggedIn = req.isAuthenticated()
    next()
}

app.use(loginCheck)

//Routes
const index = require('./routes/index')
app.use('/', index)

const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

const eventRoutes = require('./routes/yourevents')
app.use('/', eventRoutes)

const whoisgoingRoutes = require('./routes/whoisgoing')
app.use('/', whoisgoingRoutes)

module.exports = app
