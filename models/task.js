const {Schema, model} = require('mongoose')

const newTask = new Schema({
    archivo:     {type: String},
    descripcion_a: {type: String},

    texto:       {type: String},

    image:       {type: String},
    descripcion_i: {type: String},

    groupe:      {type: Schema.Types.ObjectId, ref: 'groupe' },
    user:        {type: Schema.Types.ObjectId, ref: 'user' }
}) 

module.exports = model('task', newTask);