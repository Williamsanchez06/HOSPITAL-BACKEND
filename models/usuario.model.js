const  { DataTypes, Model }  = require("sequelize");

const USER_TABLE = 'usuarios';

const UsuarioSchema = {
    id_usuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre : {
        allowNull: false,
        type :  DataTypes.STRING,
        required : true,
    },
    email : {
        allowNull: false,
        type :  DataTypes.STRING,
        required : true,
        unique : true,
    },
    password : {
        allowNull: false,
        type :  DataTypes.STRING,
        required : true,
    },
    imagen : {
        type :  DataTypes.STRING,
    },
    role : {
        type :  DataTypes.STRING,
        required : true,
        defaultValue : 'USER_ROLE',
    },
    google : {
        type :  DataTypes.BOOLEAN,
        defaultValue: false
    },
    
}

class User extends Model {

    static associate( models ){
      this.hasMany( models.Hospital, { as : 'hospital', foreignKey : 'usuario' } ),
      this.hasMany( models.Medico, { as : 'medico', foreignKey : 'usuario' } )
    }

    static config( db ) {
        return {
          sequelize : db,
          tableName : USER_TABLE,
          modelName : 'User',
          TimeRanges : false
        }
    }
  
}

module.exports = { UsuarioSchema , User, USER_TABLE };