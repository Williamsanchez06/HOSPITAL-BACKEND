const express = require('express');
const { dbConnection } = require('./database/config')
require('dotenv').config();
const cors = require('cors');

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Conexion A la DB
dbConnection();

//Rutas
app.get('/', ( req , res ) => {
    res.json({
        ok : true,
        msg : 'Hola XD'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en puerto ' +  process.env.PORT );
})