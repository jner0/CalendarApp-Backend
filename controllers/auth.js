const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
    //console.log(req.body);
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email })

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();
        //Generar JWT   
        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email })

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo'
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            });
        }

        // Generar nuestro Json web Token
        const token = await generarJWT(usuario.id, usuario.name);
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


const revalidarToken = (req, res = response) => {
        res.json({
            ok: true,
            msg: 'renew'
        })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}