const Room = require('../models/room')

module.exports = app => {
    const server = require('http').createServer(app)
    const io = require('socket.io')(server)

    io.on('connection', async(socket) =>{
        console.log('chat connect');

        socket.on('join-room', async(data) =>{
            const room = await Room.findOne({groupeId:data.idGroupe})
            socket.join(room._id)
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

    return server
}