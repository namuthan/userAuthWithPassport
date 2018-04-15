
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('pages/index.ejs', { req: req })
    })

    app.get('/login', (req, res) => {
        res.render('pages/login.ejs', { req: req, messages: req.flash('loginMessages') })
    })

    app.get('/register', (req, res) => {
        res.render('pages/register.ejs', { req: req, messages: req.flash('registerMessage') })
    })

    app.get('/profile', isAuthenticated, (req, res) => {
        res.render('pages/profile.ejs', { req: req })
    })
    


    // API Routes

    app.get('/users', (req, res) => {
        User
            .find()
            .exec()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.post('/register', passport.authenticate('register', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }))

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

}


