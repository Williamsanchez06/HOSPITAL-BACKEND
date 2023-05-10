/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-JWT');

const router = Router();

router.get('/', validarJWT , getUsuarios);

router.post('/', 
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        validarCampos
    ], crearUsuario );

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('role', 'El role es Obligatorio').not().isEmpty(),
        validarCampos
    ],
 actualizarUsuario )

router.delete('/:id', validarJWT, deleteUsuario );

module.exports = router;