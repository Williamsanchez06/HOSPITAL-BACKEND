const { response } = require("express");
const bcrypt = require("bcrypt");

const { db } = require("../database/config");
const { generarJWT } = require("../helpers/jwt.helpers");
const { googleVerify } = require("../helpers/google-verify");

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await db.models.User.findOne( { where : { email } } );

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

const googleSignIn = async ( req, res = response ) => {
    
    try {

       const { email, name, picture } = await googleVerify( req.body.token );
    
       const usuarioDB = await db.models.User.findOne( { where : { email } } );
        
       let usuario;

       if ( !usuarioDB ) {

            usuario = await db.models.User.create({
                nombre : name,
                email,
                password : "@@",
                imagen : picture,
                google : true
            })

       } else {

            usuario = usuarioDB;

            await usuarioDB.update({
                google : true
            });
            
       }

       const token = generarJWT( usuario.id_usuario, usuario.nombre );

       return res.status( 200 ).json({
            ok: true,
            email,
            name,
            picture,
            token
       })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg : 'Token de google no es correcto'
        })
    }

}

const renewToken = async ( req , res = response ) => {

    const { id_usuario, nombre } = req;

    //Generar nuevo TOKEN - JWT 
    const token = generarJWT( id_usuario, nombre );

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}