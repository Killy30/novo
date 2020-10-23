const {Schema, model} = require('mongoose')

const groupeSchema = new Schema({
    name:        {type: String},
    nivel:       {type: String},
    description: {type: String},
    color:       {type: String},
    time:        {type: Date, default: Date.now},
    teacher:     {type: Schema.Types.ObjectId, ref: 'user' },
    students:    [{type: Schema.Types.ObjectId, ref: 'user' }],
    tasks:       [{type: Schema.Types.ObjectId, ref: 'task' }],
    solicitud:   [{type: Schema.Types.ObjectId, ref: 'user' }]
})

module.exports = model('groupe', groupeSchema)
