const {response} = require('express');

const getEventos = async(req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento = async(req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'crearEventos'
    })
}

const actualizarEvento = async( req, res = response) =>{
    res.status(201).json({
        ok: true,
        msg: 'Actualizando Evento'
    })
}

const eliminarEvento = async( req, res = response) =>{
    res.status(201).json({
        ok: true,
        msg: 'Eliminando Evento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}