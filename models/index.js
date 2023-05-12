const { HospitalSchema, Hospital } = require('./hospital.model');
const { Medico, MedicoSchema } = require('./medico.model');
const { UsuarioSchema, User } = require('./usuario.model');

function setupModels( db ) {

    User.init( UsuarioSchema , User.config( db ) );
    Hospital.init( HospitalSchema , Hospital.config( db ) );
    Medico.init( MedicoSchema, Medico.config( db ) );

    User.associate( db.models );
    Hospital.associate( db.models );
    Medico.associate( db.models );

}

module.exports = setupModels;
