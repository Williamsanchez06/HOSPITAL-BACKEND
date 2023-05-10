const  { DataTypes }  = require("sequelize");
const { db } = require("../database/config");

const UsuarioSchema = db.define('usuarios',{
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
})

module.exports = UsuarioSchema;