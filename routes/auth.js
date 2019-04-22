const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

router.get('/login', (req, res, next) => {
    res.render('auth/login', { message: req.flash('error') })
})

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        passReqToCallback: true
    })
)

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    if (username === '' || password === '') {
        res.render('auth/signup', { message: 'Indicate username and password' })
        return
    }

    User.findOne({ username }, 'username', (err, user) => {
        if (user !== null) {
            res.render('auth/signup', { message: 'The username already exists' })
            return
        }

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPass
        })

        newUser
            .save()
            .then(() => {
                res.redirect('/auth/profile')
            })
            .catch(err => {
                res.render('auth/signup', { message: 'Something went wrong' })
            })
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/profile', (req, res) => {
    const { _id } = req.user
    User.findById({ _id })
        .then(user => {
            res.render('auth/profile', user)
        })
        .catch(err => {
            console.error('Error while displaying profile', err)
        })
})

router.get('/edit', (req, res) => {
    const { _id } = req.user
    User.findById({ _id })
        .then(user => {
            res.render('auth/edit', user)
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/edit', (req, res) => {
    const { _id } = req.user
    const { username, email } = req.body
    User.findByIdAndUpdate({ _id }, { username, email })
        .then(() => {
            res.redirect('/auth/profile')
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/delete', (req, res) => {
    const { _id } = req.user
    User.findByIdAndRemove({ _id })
        .then(user => {
            res.redirect('/')
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router
