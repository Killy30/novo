const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    name:          {type: String},
    lastName:      {type: String},
    email:         {type: String},
    password:      {type: String},
    category:      {type: String},
    groupes:       [{ type: Schema.Types.ObjectId, ref: 'groupe' }],
    task:          [{ type: Schema.Types.ObjectId, ref: 'task' }],
    recordatorios: [{type: Schema.Types.ObjectId, ref: 'recordatorio'}]
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null);
};

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = model('user', userSchema)