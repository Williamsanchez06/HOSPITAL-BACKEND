const  { DataTypes, Model }  = require("sequelize");

const { USER_TABLE } = require('./usuario.model');

const HOSPITAL_TABLE = 'hospitales';

const HospitalSchema = {

    id_hospital: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre : {
      allowNull : false,
      required: true,
      type: DataTypes.STRING
    },
    imagen: {
        type : DataTypes.STRING
    },
    usuario: {
        require: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: USER_TABLE,
          key: 'id_usuario'
        },
    }
    
}

class Hospital extends Model {

  static associate( models ){
    this.belongsTo( models.User, { as: 'user', foreignKey : 'usuario' } );
  }

  static config( db ) {
    return {
      sequelize : db,
      tableName : HOSPITAL_TABLE,
      modelName : 'Hospital',
      TimeRanges: false,
    }
  }

}

// HospitalSchema.associate = function(models)  {
//   HospitalSchema.belongsTo(models.usuarios, { 
//     foreignKey : 'usuario'
//   });
// }

// HospitalSchema.belongsTo(Usuario, { 
//   foreignKey : 'usuario'
// });

module.exports =  { HospitalSchema, Hospital, HOSPITAL_TABLE } ;