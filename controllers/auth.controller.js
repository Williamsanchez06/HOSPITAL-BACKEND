const { response } = require("express");
const bcrypt = require("bcrypt");

const Usuario = require("../models/usuario.model");
const { generarJWT } = require("../helpers/jwt.helpers");

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne( { where : { email } } );

        //Verificar Email
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync( password , usuarioDB.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar Token
        const token = generarJWT( usuarioDB.id_usuario, usuarioDB.nombre );

        return res.status(200).json({
            ok: true,
            msg: 'Iniciaste Sesion',
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg : 'Error interno en el Servidor'
        })
    }

}

module.exports = {
    login
}