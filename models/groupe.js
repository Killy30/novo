const {Schema, model} = require('mongoose')

const groupeSchema = new Schema({
    name:        {type: String},
    nivel:       {type: String},
    description: {type: String},
    color:       {type: String},
    teacher:     {type: Schema.Types.ObjectId, ref: 'user' },
    student:     [{type: Schema.Types.ObjectId, ref: 'user' }],
    tasks:     [{type: Schema.Types.ObjectId, ref: 'task' }]
})

module.exports = model('groupe', groupeSchema)
