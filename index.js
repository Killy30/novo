const express = require('express')
const config_server = require('./server/config')
const router = require('./routes/index')
const socket = require('./server/socket')

require('./database/configDB')
require('./passport/auth')
const app = config_server(express())
const server = socket(app)

server.listen(app.get('port'), () =>{
    console.log('Server is connecting on port: ', app.get('port'));
})
