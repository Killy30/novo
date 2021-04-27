const {Schema, model} = require('mongoose')

const newListTask = new Schema({
    task:       {type: Schema.Types.ObjectId, ref: 'task' },
    files:      [{
        file: {type: String},
        nameFile: {type: String},
        size: {type: Number}
    }],
    userSubmittedTasks: {type: Schema.Types.ObjectId, ref: 'user'},
    ratings: {type: Number, default:00},
    status: {type:Boolean, default:false}
}) 

module.exports = model('taskSubmitted', newListTask);