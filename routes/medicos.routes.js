/*
    Medicos
    ruta : '/api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-JWT');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos.controller');

const router = Router();

router.get('/', validarJWT , getMedicos);

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del Medico es Obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital es Obligatorio').not().isEmpty().not().isNumeric(),
        validarCampos,
    ], crearMedico );

router.put('/:id',
    [
    ],
 actualizarMedico )

router.delete('/:id', validarJWT, eliminarMedico );

module.exports = router;