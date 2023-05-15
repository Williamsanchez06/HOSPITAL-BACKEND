const { response } = require("express")

const { db } = require("../database/config");

const getMedicos = async ( req, res = response) => {

    const medicos = await db.models.Medico.findAll({
        include : ['user', 'Hospital']
    });

    return res.json({
        ok: true,
        msg: 'getMedico',
        medicos
    })

}

const crearMedico = async ( req, res = response) => {

    const id_usuario = req.id_usuario;

    const { hospital } = req.body;

    try {

        const existeHospital = await db.models.Hospital.findByPk( hospital );

        if ( !existeHospital ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'Hospital no Existe',
            })
        }
        
        const medicoDB = await db.models.Medico.create({
            usuario : id_usuario,
            ...req.body,
        });

        return res.status( 200 ).json({
            ok: true,
            medico : medicoDB
        })

    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            ok: false,
            msg : 'Error interno en el servidor'
        })
    }

}

const actualizarMedico = async ( req, res = response ) => {

    const { id } = req.params;
    const body = req.body;

    try {

        const medicoDB = await db.models.Medico.findByPk( id );

        if ( !medicoDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'Medico no Encontrado'
            });
        }

        const hospitalDB = await db.models.Hospital.findByPk( body.hospital );

        if ( !hospitalDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'Hospital no Encontrado'
            });
        }

        await medicoDB.update( body );

        return res.json({
            ok: true,
            msg : 'Medico Actualizado',
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            ok: false,
            msg : 'Error interno en el servidor'
        })
    }
    
}

const eliminarMedico = async ( req, res = response) => {

    const { id } = req.params;

    try {

        const medicoDB = await db.models.Medico.findByPk( id );

        if ( !medicoDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg : 'Medico no Encontrado'
            });
        }

        await medicoDB.destroy();

        return res.json({
            ok: true,
            msg : 'Medico Eliminado',
        })

    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            ok: false,
            msg : 'Error interno en el servidor'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}