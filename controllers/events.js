const { response } = require("express");
const Evento = require("../models/evento");

const getEventos = async (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "getEventos",
  });
};

const crearEvento = async (req, res = response) => {
  // verificar que tenga el evento
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

};

const actualizarEvento = async (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "Actualizando Evento",
  });
};

const eliminarEvento = async (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "Eliminando Evento",
  });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
