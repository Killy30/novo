const Groupe = require('../models/groupe')
const User = require('../models/user')

const ctlr = {}

ctlr.index = (req, res) =>{
    res.render('index')
}

ctlr.inicio = async(req, res) =>{
    const user = req.user
    const groupe = await User.findOne(user._id).populate('groupes')
    res.render('inicio', {user, groupe})
}

ctlr.emails = (req, res) =>{
    res.render('email', {user:req.user})
}
ctlr.notas = (req, res) =>{
    res.render('nota', {user:req.user})
}
ctlr.calendario = (req, res) =>{
    res.render('calendario', {user:req.user})
}
ctlr.configuracion = (req, res) =>{
    res.render('configuracion', {user:req.user})
}


module.exports = ctlr;