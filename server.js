const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const dbUtils = require('./src/utils/database')
require('dotenv').config()

const port = process.env.PORT || 3000

// connect to the db

const url = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASS}${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`
dbUtils.connect(url)
    .then(_ => {
        console.log('Successfully connected to DB 😀')
    })
    .catch(err => {
        console.log(`Error Connecting to the mongo DB ${error}`)
    })

require('./src/utils/passport')(passport)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}))
app.use(flash())
app.use(passport.initialize())
app.set('view engine', 'ejs')
app.use(passport.session())


require('./src/routes/routes')(app, passport)

const server = app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});



