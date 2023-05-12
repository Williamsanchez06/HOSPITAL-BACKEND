/*
    ruta : /api/upload
*/
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middleware/validar-JWT');
const expressFileUpload = require('express-fileupload');

const { Router } = require('express');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id_usuario', validarJWT, fileUpload );
router.get('/:tipo/:imagen', retornaImagen );

module.exports = router;