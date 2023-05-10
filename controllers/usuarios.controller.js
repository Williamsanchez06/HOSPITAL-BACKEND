const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario.model');

const getUsuarios = async ( req , res ) => {

    const usuarios = await Usuario.findAll();

    return res.json({
        ok : true,
        msg : 'Get Users',
        usuarios,
        id_usuario : req.id_usuario
    })

}

const crearUsuario = async ( req , res = response ) => {
    
   const { email, password, nombre } = req.body;

   try {

    const emailUserDB = await Usuario.findOne( { where : { email } } ); 
    
    if ( emailUserDB ) {
        return res.status( 400 ).json({
            ok : false,
            msg : 'Email en Uso'
        })
    }

    //Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync( password , salt );

    //Crear Usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password : hash
    });

     const { ...response } = usuario.toJSON();
     delete response.password;

     return res.status( 200 ).json({
                ok: true,
                msg : 'Created User',
                user : response
            })

   } catch (error) {

    console.log(error);
    return res.status(500).json({
        ok: false,
        msg : 'Error Interno en el Servidor'
    });

   }  

}

const actualizarUsuario = async ( req , res = response ) => {

    const id = req.params.id;

    try {

        const usuarioDb = await Usuario.findByPk( id );

        if ( !usuarioDb ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'No existe un Usuario por ese Id'
            })
        }



        // Update
        const { password , google , email, ...campos } = req.body;

        if ( usuarioDb.email !== email ) {

            const existeEmail = await Usuario.findOne( { where : { email } } ); 
            if( existeEmail ) {
                return res.status( 400 ).json({
                    ok : false,
                    msg : 'Ese correo Ya existe'
                })
            }

        }

        campos.email = email;

        const usuarioActualizado = await usuarioDb.update( campos );

        return res.json({
            ok: true,
            usuarioActualizado
        })
    
       } catch (error) {
    
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg : 'Error Interno en el Servidor'
        });
    
       }

}

const deleteUsuario = async (req, res = response) => {

    const id = req.params.id;

    try {
        
        const usuarioDb = await Usuario.findByPk( id );

        if( !usuarioDb ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'Usuario No Existe'
            })
        }

        await usuarioDb.destroy();

        return res.status( 200 ).json({
            ok: true,
            msg: 'Usuario ELiminado',
            userEliminado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg : 'Error Interno en el Servidor'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario
}