const { response } = require("express")

const { db } = require("../database/config");

const getHospitales = async ( req, res = response) => {

    const hospitales = await db.models.Hospital.findAll({
        include : ['user'],
    });

    return res.json({
        ok: true,
        msg: 'getHospitales',
        hospitales
    })

}

const crearHospital = async ( req, res = response) => {
    
    const id_usuario = req.id_usuario;

    try {

        const hospitalDB = await db.models.Hospital.create({
            usuario : id_usuario,
            ...req.body,
        });

        return res.status(200).json({
            ok: true,
            hospital : hospitalDB
        })
        
    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            ok: false,
            msg : 'Error ointerno en el servidor'
        })
    }

}

const actualizarHospital = async ( req, res = response ) => {
    
    const { id } = req.params;
    const body = req.body;

    try {

        const hospitalDB = await db.models.Hospital.findByPk( id );

        if ( !hospitalDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'Hospital no Encontrado'
            });
        }

        await hospitalDB.update( body );

        return res.status( 200 ).json({
                    ok: true,
                    msg : 'Hospital Actualizado',
                    hospitalDB
               });

    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            ok: false,
            msg : 'Error ointerno en el servidor'
        })
    }

}

const eliminarHospital = async ( req, res = response) => {

    const { id } = req.params;

    try {
        
        const hospitalDB = await db.models.Hospital.findByPk( id );

        if ( !hospitalDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'Hospital no Encontrado'
            });
        }
    
        await hospitalDB.destroy();

        return res.json({
            ok: true,
            msg : 'Hospital Eliminado'
        })

    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            ok: false,
            msg : 'Error ointerno en el servidor'
        })
    }

    
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}