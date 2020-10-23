const Groupe = require('../models/groupe')
const path = require('path')
const multer = require('multer')
const formidable = require('formidable')
const Recordatorio = require('../models/recordatorioM')
const User = require('../models/user')
const Task = require('../models/task')
const { find } = require('../models/groupe')


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload'),
    filename: (req, file, cb, filename) =>{
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})

const upload = multer({storage}).array("file")

const ctlr = {}

ctlr.create_groupe_p = async(req, res) =>{
    const user = req.user;
    const new_groupe = new Groupe()
    new_groupe.name = req.body.name;
    new_groupe.nivel = req.body.nivel;
    new_groupe.description = req.body.description;
    new_groupe.color = req.body.color
    new_groupe.teacher = user
    
    user.groupes.push(new_groupe)
    await user.save()
    await new_groupe.save()
    res.redirect('/groupe/'+new_groupe._id)
}

//router
ctlr.groupe = async(req, res) =>{
    const groupe = await Groupe.findOne({_id: req.params.id}).populate('user')
    res.render('./profesor/groupe', {groupe})
}
ctlr.recordatorio = (req, res) =>{
    res.render('./profesor/recordatorio', {user:req.user})
}
ctlr.solicitud = async (req, res) =>{
    const user = req.user
    const groupe = await Groupe.findOne({_id: req.params.id})
    res.render('./profesor/pages/solicitud', {user, groupe})
}
ctlr.mienbros = async(req, res)=>{
    const groupe = await Groupe.findOne({_id: req.params.id})
    res.render('./profesor/pages/mienbros', {groupe})
}
ctlr.groupe_chat = async(req, res) =>{
    const groupe = await Groupe.findOne({_id: req.params.id})
    res.render('./profesor/pages/groupe_chat',{groupe})
}


//json

ctlr.groupe_id = async(req, res) =>{
    const groupe = await Groupe.findOne({_id: req.params.id}).populate('solicitud').populate('students')
    res.json(groupe)
}
ctlr.acceptUser = async(req, res) =>{
    const ids = JSON.parse(req.params.id)
    
    const groupe = await Groupe.findOne({_id: ids.groupe_id})
    const user = await User.findOne({_id: ids.user_id})
    

    const index = groupe.students.indexOf(user._id)
    const _index = groupe.solicitud.indexOf(user._id)

    if(index == -1){
        groupe.students.push(user)
        user.groupes.push(groupe)
        groupe.solicitud.splice(_index, 1)

        await groupe.save()
        await user.save()
        return res.json('succes')
    }
}

ctlr.deleteUserAtGroupe = async(req, res)=>{
    const ids = JSON.parse(req.params.id)
    
    const groupe = await Groupe.findOne({_id: ids.groupe_id})
    const user = await User.findOne({_id: ids.user_id})

    const index = groupe.students.indexOf(user._id)
    const index_ = user.groupes.indexOf(groupe._id)

    if(index !== -1 && index_ !== -1){
        groupe.students.splice(index,1)
        user.groupes.splice(index_,1)
        await user.save()
        await groupe.save()
        return res.json('succes')
    }
    res.json('Hay un problema con esta grupo')
}

ctlr.deleteGroupe = async(req, res) =>{
    const groupe = await Groupe.findByIdAndDelete({_id: req.params.id})
    const users = await User.find()

    for(var i = 0; i < users.length; i++){
        console.log(users[i].name);
        let b = users[i].groupes.indexOf(groupe._id)
        console.log(b);
        if(b !== -1){
            users[i].groupes.splice(b, 1)
            await users[i].save()
        }
    }
    res.redirect('/inicio')
}

ctlr.create_task_p =  async (req, res, next) =>{
    const groupe = await Groupe.findOne({_id: req.params.id})
    const user = req.user

    upload(req, res, async(err) =>{
        if(err){
            console.log(err);
        }else{
            const newTask = new Task()

            if(req.files.length <= 0){
                newTask.description = req.body.description
                newTask.limitTime = req.body.limit_time
                newTask.groupe = groupe
            }else{
                newTask.description = req.body.description
                newTask.limitTime = req.body.limit_time
                newTask.groupe = groupe
                req.files.forEach(element => {
                    let file = {
                        file:'/upload/'+element.filename
                    }
                    newTask.files.push(file)
                });
            }
            await newTask.save()
            groupe.tasks.push(newTask)
            await groupe.save()
        }
        res.redirect('/groupe/'+groupe._id)
    })
}

ctlr.getTasks = async(req, res) =>{
    const tasks = await Task.find({groupe: req.params.id})
    res.json(tasks)
}
ctlr.recordatorio_post = async(req, res) =>{
    const data = JSON.parse(req.params.id)
    const user =req.user;
    
    const recordatorio = new Recordatorio()
    recordatorio.titulo = data.titulo;
    recordatorio.descripcion = data.descripcion;
    recordatorio.timeA = data.timeA;
    recordatorio.user = user
    
    await recordatorio.save()
    user.recordatorios.push(recordatorio)
    await user.save()

    res.json({response: 'save'})
}

ctlr.alamr_function = async(req, res) =>{
    const time_alamr = await Recordatorio.find({user:req.user}).sort({timeA: 1})

    res.json({msg:time_alamr})
}




module.exports = ctlr;