const { db } = require("../database/config");
const fs = require("fs");

const borrarImagen = ( path ) => {

        if ( fs.existsSync( path ) ) {
            //Borrar la imagen anterior
            fs.unlinkSync( path );
        }

}

const actualizarImagen = async ( tipo , id_usuario, nombre_archivo ) => {

    let pathViejo;

    switch ( tipo ) {

        case 'medicos':

            const medico = await db.models.Medico.findByPk( id_usuario );
            if( !medico ) {
                console.log('No se encontro medico');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.imagen }`;
            borrarImagen( pathViejo );
            
            medico.imagen = nombre_archivo;
            await medico.update({ imagen: nombre_archivo});
            return true;
            break;

        case 'hospitales':
            const hospital = await db.models.Hospital.findByPk( id_usuario );
            if( !hospital ) {
                console.log('No se encontro El hospital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.imagen }`;
            borrarImagen( pathViejo );
            
            hospital.imagen = nombre_archivo;
            await hospital.update({ imagen: nombre_archivo});
            return true;
            break;

        case 'usuarios':
            const usuario = await db.models.User.findByPk( id_usuario );
            if( !usuario ) {
                console.log('No se encontro el Usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.imagen }`;
            borrarImagen( pathViejo );
            
            usuario.imagen = nombre_archivo;
            await usuario.update({ imagen: nombre_archivo});
            return true;
            break;

        default :
            return res.status(404).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })

    }

}

module.exports = {
    actualizarImagen
}