const User = require('../models/user')
const Groupe = require('../models/groupe')
const { use } = require('passport')

const ctlr = {}

//route
ctlr.profile_teacher = async (req, res) =>{
    const user = req.user
    const teacher = await  User.findOne({_id: req.params.id}).populate('groupes')
    res.render('./estudiante/pages/profileTeacher',{user, teacher})
}

//json
ctlr.getUser = async(req, res) =>{
    const users = await User.find()
    res.json({users})
}
ctlr.getTeacher = async(req, res) =>{
    const teacher = await User.findOne({_id: req.params.id}).populate('groupes')
    res.json({teacher})
}
ctlr.solicitar_groupe = async (req, res)=>{
    const user = req.user
    const groupe = await Groupe.findOne({_id: req.params.id})

    let index = groupe.solicitud.indexOf(user._id)

    if(index == -1){
        groupe.solicitud.push(user)
        await groupe.save()
        return res.json(true)
    }
    
    if(index !== -1){
        groupe.solicitud.splice(index, 1)
        await groupe.save()
        return res.json(false)
    }
}

module.exports = ctlr