const { Schema, model } = require('mongoose')

const roomSchema = new Schema({
    messages: [{
        myId: String,
        message: String,
        file: String,
        dateMsg: {type: Date, default: Date.now}
    }],
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    groupeId: {type: Schema.Types.ObjectId, ref: 'groupe'}
})

module.exports = model('room', roomSchema)