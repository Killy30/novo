const {Schema, model} = require('mongoose')

const newTask = new Schema({
    
    description:  {type: String},
    limitTime:    {type: Date},
    timesAgo:     {type: Date, default: Date.now},
    groupe:       {type: Schema.Types.ObjectId, ref: 'groupe' },
    files:        [{
        file: {type: String},
        nameFile: {type: String},
        size: {type: Number}
    }],
    listTaskSubmitted: [{type: Schema.Types.ObjectId, ref: 'taskSubmitted' }]
}) 

module.exports = model('task', newTask);
