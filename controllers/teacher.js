const Groupe = require('../models/groupe')
const path = require('path')
const multer = require('multer')
const formidable = require('formidable')
const Recordatorio = require('../models/recordatorioM')
const User = require('../models/user')
const Task = require('../models/task')
const Room = require('../models/room')
const ListTask = require('../models/taskSubmitted')




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
    const newRoom = new Room()

    new_groupe.name = req.body.name;
    new_groupe.nivel = req.body.nivel;
    new_groupe.description = req.body.description;
    new_groupe.color = req.body.color
    new_groupe.teacher = user

    newRoom.groupeId = new_groupe
    new_groupe.room = newRoom

    user.rooms.push(newRoom)
    newRoom.users.push(user)
    user.groupes.push(new_groupe)
    await user.save()
    await new_groupe.save()
    await newRoom.save()
    
    res.redirect('/groupe/'+new_groupe._id)
}

//router
ctlr.groupe = async(req, res) =>{
    const user = req.user
    const groupe = await Groupe.findOne({_id: req.params.id}).populate('user')
    const room = await Room.findOne({_id: groupe._id})
    res.render('./profesor/groupe', {groupe,room,user})
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
    const user = req.user
    const groupe = await Groupe.findOne({_id: req.params.id})
    const room = await Room.findOne({_id: groupe._id})
    res.render('./profesor/pages/groupe_chat',{groupe,room,user})
}
ctlr.viewTask = async(req, res) =>{
    const task = await Task.findOne({_id:req.params.id})
    const groupe = await Groupe.findOne({_id: task.groupe})
    const user = req.user;
    const taskView = await ListTask.findOne({userSubmittedTasks: user._id})


    res.render('./profesor/pages/viewTask', {
        task,
        groupe,
        user,
    })
}
ctlr.detailsTask = async(req, res) =>{
    const taskView = await ListTask.findById({_id: req.params.id}).populate('userSubmittedTasks')
    res.json({taskView})
}
ctlr.post_status_ratings = async(req, res) =>{
    const taskView = await ListTask.findById({_id: req.params.id})
    
    const data = req.body
    taskView.status = data.status
    taskView.ratings = data.ratings
    await taskView.save()
    res.json({taskView})
}

ctlr.viewProfileStudent = async(req, res) =>{
    const user = await User.findOne({_id: req.params.id}).populate('groupes')
    const teacher = await User.findOne({_id: req.user._id}).populate('groupes')

    res.render('./profesor/pages/profileStudent',{user, teacher})
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
    const room = await Room.findOne({_id: groupe.room})

    const index = groupe.students.indexOf(user._id)
    const _index = groupe.solicitud.indexOf(user._id)

    if(index == -1){
        groupe.students.push(user)
        user.groupes.push(groupe)
        groupe.solicitud.splice(_index, 1)

        user.rooms.push(room)
        room.users.push(user)

        await room.save()
        await groupe.save()
        await user.save()
        return res.json('succes')
    }
}

ctlr.deleteUserAtGroupe = async(req, res)=>{
    const ids = JSON.parse(req.params.id)
    
    const groupe = await Groupe.findOne({_id: ids.groupe_id})
    const user = await User.findOne({_id: ids.user_id})
    const room = await Room.findOne({_id: groupe.room})

    const a = groupe.students.indexOf(user._id)
    const b = user.groupes.indexOf(groupe._id)
    const c = user.rooms.indexOf(room._id)
    const d = room.users.indexOf(user._id)

    if(a !== -1 && b !== -1){
        groupe.students.splice(a,1)
        user.groupes.splice(b,1)
        room.users.splice(d,1)
        user.rooms.splice(c,1)

        await room.save()
        await user.save()
        await groupe.save()
        return res.json('succes')
    }
    res.json('Hay un problema con esta grupo')
}

ctlr.deleteGroupe = async(req, res) =>{
    const groupe = await Groupe.findByIdAndDelete({_id: req.params.id})
    const room = await Room.findByIdAndDelete({groupeId: req.params.id})
    const users = await User.find()

    for(var i = 0; i < users.length; i++){
        let b = users[i].groupes.indexOf(groupe._id)
        let c = users[i].rooms.indexOf(room._id)
        
        if(b !== -1){
            users[i].groupes.splice(b, 1)
            users[i].rooms.splice(c, 1)
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
                        file:'/upload/'+element.filename,
                        nameFile: element.originalname,
                        size: element.size
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

//
ctlr.sent_task =  async (req, res, next) =>{
    const task = await Task.findOne({_id: req.params.id})
    const user = req.user

    upload(req, res, async(err) =>{
        if(err){
            console.log(err);
        }else{
            const newTaskSubmit = new ListTask()

            req.files.forEach(element => {
                let file = {
                    file:'/upload/'+element.filename,
                    nameFile: element.originalname,
                    size: element.size
                }
                newTaskSubmit.files.push(file)
            });

            newTaskSubmit.task = task
            newTaskSubmit.userSubmittedTasks = user
            user.listTaskSubmitted.push(newTaskSubmit)
            task.listTaskSubmitted.push(newTaskSubmit)

            await newTaskSubmit.save()
            await task.save()
            await user.save()
            // console.log(task);
        }
        res.redirect('/task/'+task._id)
    })
}

ctlr.getTasks = async(req, res) =>{
    const tasks = await Task.find({groupe: req.params.id})
    res.json(tasks)
}
ctlr.getTask = async(req, res) =>{
    const task = await Task.findOne({_id: req.params.id}).populate('listTaskSubmitted')
    res.json(task)
}
ctlr.getListTaskSubmitted = async(req, res) =>{
    const ListTasks = await ListTask.find({task: req.params.id}).populate('userSubmittedTasks')
    res.json(ListTasks)
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
ctlr.getMyUser = async(req, res)=>{
    const teacher = await User.findOne({_id: req.user._id}).populate('groupes')
    res.json(teacher)
}

ctlr.alamr_function = async(req, res) =>{
    const time_alamr = await Recordatorio.find({user:req.user}).sort({timeA: 1})

    res.json({msg:time_alamr})
}

ctlr.room = async(req, res) =>{
    const room = await Room.findOne({groupeId: req.params.id}).populate('groupeId').populate('users')
    res.json(room)
}

module.exports = ctlr;