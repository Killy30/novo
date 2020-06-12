const passport = require('passport')

const ctlr = {}


ctlr.registro_g = (req, res) =>{
    res.render('registro')
}

ctlr.iniciar_sesion_g = (req, res) =>{
    res.render('iniciar_sesion')
}

ctlr.registro_p = passport.authenticate('local-signup', {
    successRedirect: '/inicio',
    failureRedirect: '/registro',
    passReqToCallback: true
})

ctlr.iniciar_sesion_p = passport.authenticate('local-login', {
    successRedirect: '/inicio',
    failureRedirect: '/iniciar_sesion',
    passReqToCallback: true
})

ctlr.logout = (req, res, next) => {
    req.logout();
    res.redirect('/iniciar_sesion')
}

module.exports = ctlr;