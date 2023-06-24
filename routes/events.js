/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')

const router = Router();

//Todas tienen que pasar por la validacion del JWT
//Obtener eventos
router.get('/', validarJWT, getEventos)

//Crear un nuevo evento
router.post('/', validarJWT, crearEvento)

//Actualizar evento
router.put('/:id', validarJWT, actualizarEvento)

//BorrarEvento
router.delete('/:id', validarJWT, eliminarEvento)

module.exports = router;