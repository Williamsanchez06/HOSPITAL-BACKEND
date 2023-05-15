/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El email es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
], login)

router.post('/google', [
    check('token', 'El token de google es Obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)

module.exports = router;