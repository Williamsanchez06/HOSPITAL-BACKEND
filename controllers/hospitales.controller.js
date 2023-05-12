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

const actualizarHospital = ( req, res = response) => {
    res.json({
        ok: true,
        msg : 'UpdateHospital'
    })
}

const eliminarHospital = ( req, res = response) => {
    res.json({
        ok: true,
        msg : 'DeleteHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}