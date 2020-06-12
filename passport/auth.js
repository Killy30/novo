const passport = require('passport')
const LocalStategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
     const user = await User.findById(id);
     done(null, user)
});
passport.use('local-signup', new LocalStategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email})
    if(user) {
        return done(null, false, req.flash('registroMessage', 'Email existente'));
    }else{
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.lastName = req.body.lastName
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.category = req.body.category;

        await newUser.save();
        done(null, newUser);
    };

}));

passport.use('local-login', new LocalStategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const user = await User.findOne({email: email});

    if(!user){
        return done(null, false, req.flash('iniciarMessage', 'Usuario no encontrado') )
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('iniciarMessage', 'Contrasena incorrecta') )
    }
    done(null, user)
}))

