const {Schema, model} = require('mongoose')

const newListTask = new Schema({
    task:       {type: Schema.Types.ObjectId, ref: 'task' },
    files:      [{
        file: {type: String},
        nameFile: {type: String},
        size: {type: Number}
    }],
    userSubmittedTasks: {type: Schema.Types.ObjectId, ref: 'user'}
}) 

module.exports = model('taskSubmitted', newListTask);