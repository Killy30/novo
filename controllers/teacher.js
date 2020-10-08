const Groupe = require('../models/groupe')
const path = require('path')
const multer = require('multer')
const formidable = require('formidable')
const Recordatorio = require('../models/recordatorioM')


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
    res.redirect('/groupe/'+new_groupe.name)
}

//router
ctlr.groupe = async(req, res) =>{
    const groupe = await Groupe.findOne({name: req.params.name}).populate('user')
    res.render('./profesor/groupe', {groupe})
}

ctlr.create_task = async(req, res) =>{
    const groupe = await Groupe.findOne({_id: req.params.id})
    res.render('./profesor/createTask',{groupe})
}
ctlr.recordatorio = (req, res) =>{
    res.render('./profesor/recordatorio', {user:req.user})
}
ctlr.solicitud = async (req, res) =>{
    const user = req.user
    const groupe = await Groupe.findOne({_id: req.params.id})
    res.render('./profesor/pages/solicitud', {user, groupe})
}


//json
ctlr.create_task_p =  async (req, res, next) =>{
    const groupe = await Groupe.findOne({_id: req.params.id})

    upload(req, res, (err) =>{
        if(err){
            console.log(err);
        }else{
            console.log(req.files);
        }
    })
    
    // let form = formidable.IncomingForm()
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         next(err)
    //         return;
    //     }
    // })
    // form.on('fileBegin', (name, file) => {
    //     console.log(file);
    //     file.path = path.join(__dirname, '../public/files' + file.name)
    // })
    // form.on('file', (name, file) => {
    //     console.log(req.body);
    //     console.log(req.file);
    //     console.log(file);
    // })
    
    res.redirect('/groupe/'+groupe.name)
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