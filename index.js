const express = require('express')
const config_server = require('./server/config')
const router = require('./routes/index')

require('./database/configDB')
require('./passport/auth')
const app = config_server(express())

app.listen(app.get('port'), () =>{
    console.log('Server is connecting on port: ', app.get('port'));
})
