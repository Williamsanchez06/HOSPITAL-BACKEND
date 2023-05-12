const  { DataTypes, Model }  = require("sequelize");
const { db } = require("../database/config");

const MEDICO_TABLE = "medicos"

const MedicoSchema = {

    id_medico: {
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
        allowNull: false,
        required: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
    },
    hospital: {
        allowNull: false,
        require: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'hospitales',
          key: 'id_hospital'
        },
        onUpdate: 'CASCADE',
    }
    
}

class Medico extends Model {

    static associate( models ){
      this.belongsTo( models.User, { as: 'user', foreignKey : 'usuario' } );
      this.belongsTo( models.Hospital, { as: 'Hospital', foreignKey : 'hospital' } );
    }
  
    static config( db ) {
      return {
        sequelize : db,
        tableName : MEDICO_TABLE,
        modelName : 'Medico',
        TimeRanges: false,
      }
    }
  
  }

module.exports = { Medico, MedicoSchema, MEDICO_TABLE };