const { db } = require("../database/config");
const { Op } = require("sequelize");

const getTodo = async (req, res) => {

    const { busqueda } = req.params;

    try {
            const [ usuarios, medicos , hospitales ] = await Promise.all([
            db.models.User.findAll({
                where : { nombre : { [ Op.like ] : `%${ busqueda }%` } } 
            }),
            db.models.Medico.findAll({
                where : { nombre : { [ Op.like ] : `%${ busqueda }%` } } 
            }),
            db.models.Hospital.findAll({
                where : { nombre : { [ Op.like ] : `%${ busqueda }%` } } 
            })
        ])

        return res.json({
            ok: true,
            msg: 'Get Todo',
            usuarios,
            medicos,
            hospitales
        })
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Error interno en el Servidor'
        });
    }    
    
}


const getDocumentosColeccion = async (req, res) => {

    const { busqueda, tabla } = req.params;

    let data;

    try {
        switch ( tabla ) {

            case 'medicos':
                data = await db.models.Medico.findAll({
                    include : ['user', 'Hospital'],
                    where : { nombre : { [ Op.like ] : `%${ busqueda }%` } } 
                })
                break;
    
            case 'hospitales':
                data = await db.models.Hospital.findAll({
                    include : ['user'],
                    where : { nombre : { [ Op.like ] : `%${ busqueda }%` } } 
                })
                break;
    
            case 'usuarios':
                data = await db.models.User.findAll({
                    where : { nombre : { [ Op.like ] : `%${ busqueda }%` } } 
                })
                break;
    
            default :
                return res.status(404).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                })
    
        }
    
        return res.json({
            ok: true,
            resultados : data
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Error interno en el Servidor'
        });
    }

    
    
}


module.exports = {
    getTodo,
    getDocumentosColeccion
}