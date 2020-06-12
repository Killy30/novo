const {Schema, model} = require('mongoose')

const recSchema = new Schema({
    titulo:      {type: String},
    descripcion: {type: String},
    timeA:       {type: String},
    user:        {type: Schema.Types.ObjectId, ref: 'user'}
})

module.exports = model('recordatorio', recSchema)