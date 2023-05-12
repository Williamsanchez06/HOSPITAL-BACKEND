/*
    Hospitales
    ruta : '/api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware//validar-JWT');
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales.controller');

const router = Router();

router.get('/', validarJWT , getHospitales);

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], crearHospital );

router.put('/:id',
    [
    ],
 actualizarHospital )

router.delete('/:id', validarJWT, eliminarHospital );

module.exports = router;