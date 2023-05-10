const jwt = require("jsonwebtoken");

const generarJWT = ( id_usuario, nombre) => {
  const payload = { id_usuario, nombre };

  return jwt.sign( payload, process.env.SECRET_JWT_SEED, {
    expiresIn: "30d"
  });

};

module.exports = {
    generarJWT
}