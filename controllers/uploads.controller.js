const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen.helpers");

const fileUpload = ( req, res = response ) => {

    const { tipo , id_usuario } = req.params;

    //Validar tipo de tabla
    const tiposValidos = ['hospitales', 'medicos','usuarios'];
    if( !tiposValidos.includes( tipo ) ) {
        
        return res.status( 400 ).json({
            ok: false,
            msg: 'No es un Medico,Usuario u Hospital'
        })

    }

    //Validar que exista Archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun Archivo'
        })
    }

    //Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    //Validar Extension
    const extensionesValida = ['png','jpg','jpeg','gif'];

    if( !extensionesValida.includes(extensionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una Extension Permitida'
        })
    }

    //Generar el nombre del Archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
    
    //Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }

    });

    //Actualizar base de datos
    actualizarImagen( tipo, id_usuario, nombreArchivo );

    return res.json({
        ok: true,
        msg : 'FileUpload',
        nombreArchivo
    });

}

const retornaImagen = ( req , res = response ) => {

    const { tipo , imagen } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ imagen }`);

    //Imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
       return res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-image.jpg`);
        return res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}