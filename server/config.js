const routes = require('../routes/index')
const express = require('express')
const path = require('path')
const engine = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const multer = require('multer')

module.exports = app => {
    app.set('views', path.join(__dirname, '../views'))
    app.engine('ejs', engine)
    app.set('view engine', 'ejs')
    app.set('port', process.env.PORT || 3000)

    app.use(session({
        secret: 'dido',
        resave: false,
        saveUninitialized: false
    }))

    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        app.locals.registroMessage   = req.flash('registroMessage');
        app.locals.iniciarMessage   = req.flash('iniciarMessage');
        next()
    })

    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(express.static(path.join(__dirname, '../public')))
    // routes
    routes(app)



    return app
}