const express = require('express');
const { dbConnection } = require('./database/config')
require('dotenv').config();
const cors = require('cors');

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y Parseo del body
app.use( express.json() );

//Conexion A la DB
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en puerto ' +  process.env.PORT );
})