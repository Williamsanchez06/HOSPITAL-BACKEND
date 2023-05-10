const { response } = require("express");
const jwt  = require("jsonwebtoken");

const validarJWT = async (req, res = response, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            token = req.headers.authorization.split(" ")[1];
            const { id_usuario, nombre } = jwt.verify( token, process.env.SECRET_JWT_SEED );
            req.id_usuario = id_usuario;
            req.nombre = nombre;

            return next();
            
        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({ msg: e.message });
        }

    } 

    if(!token) {
        const error = new Error('Token no valido o Inexistente');
        return res.status(403).json({ msg: error.message });
    }    

    next();

}

module.exports = {
  validarJWT,
};
