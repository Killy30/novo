const login = require('../controllers/login')
const home = require('../controllers/home')
const teacher = require('../controllers/teacher')
const express = require('express')
const router = express.Router()
const student = require('../controllers/student')

module.exports = app => {
    router.get('/', home.index)

    router.get('/registro', login.registro_g)
    router.get('/iniciar_sesion', login.iniciar_sesion_g)
    router.post('/registro', login.registro_p)
    router.post('/iniciar_sesion', login.iniciar_sesion_p)
    router.get('/logout', login.logout)

    router.get('/inicio', estaAutenticado, home.inicio)

    // teacher
    router.post('/create_groupe', estaAutenticado, teacher.create_groupe_p)
    router.get('/groupe/:name', estaAutenticado, teacher.groupe)
    router.get('/create_task/:id', estaAutenticado, teacher.create_task)
    router.post('/create_task/:id', estaAutenticado, teacher.create_task_p)
    router.get('/recordatorio/:id', estaAutenticado, teacher.recordatorio)
    router.post('/recordatorios/:id', estaAutenticado, teacher.recordatorio_post)
    router.get('/alarm', estaAutenticado, teacher.alamr_function)
    router.get('/solicitudes/:id', estaAutenticado, teacher.solicitud)


    router.get('/emails', estaAutenticado, home.emails)
    router.get('/notas', estaAutenticado, home.notas)
    router.get('/calendarios', estaAutenticado, home.calendario)
    router.get('/configuracion', estaAutenticado, home.configuracion)

    // student
    router.get('/users', estaAutenticado, student.getUser)
    router.get('/profile/:id', estaAutenticado, student.profile_teacher)
    router.get('/teacher/:id', estaAutenticado, student.getTeacher)
    router.get('/solicitar_groupe/:id', estaAutenticado, student.solicitar_groupe)

    function estaAutenticado(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/iniciar_sesion')
    }
    app.use(router)
}