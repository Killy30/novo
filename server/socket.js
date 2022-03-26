const Room = require('../models/room')
const multer = require('multer')
const path = require('path')
const routes = require('../routes/index')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload'),
    filename: (req, file, cb, filename) =>{
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})

const upload = multer({storage}).single('filesChat')

module.exports = app => {
    const server = require('http').createServer(app)
    const io = require('socket.io')(server)

    io.on('connection', async(socket) =>{
        console.log('chat connect');

        socket.on('join-room', async(data) =>{
            const room = await Room.findOne({groupeId:data.idGroupe})
            socket.join(room._id)
        })

        app.post('/filesUpload', async(req, res) =>{
            
            upload(req, res, async(err) =>{
                if(err){
                    console.log(err);
                }else{
                    let room = await Room.findOne({groupeId:req.body.idGroupe}).populate('users').populate('groupeId')
                    if (req.file == undefined) {
                        let message = {
                            myId: req.body.userId,
                            message: req.body.message
                            
                        }
                        room.messages.push(message)
                        await room.save()
                        io.in(room._id).emit('message', {room})
                    }else{
                        let message = {
                            myId: req.body.userId,
                            message: req.body.message,
                            file: '/upload/'+ req.file.filename
                        }
                        room.messages.push(message)
                        await room.save()
                        io.in(room._id).emit('message', {room})
                    }
                } 
            })

            res.json('sucess')
        })

        socket.on('message-emit', async(data) =>{  
            const room = await Room.findOne({groupeId:data.idGroupe}).populate('users').populate('groupeId')

            let message = {
                myId:data.userId,
                message: data.message
            }
            
            room.messages.push(message)
            await room.save()
            io.in(room._id).emit('message', {room})
        })
    })
    
    routes(app)
    return server
}