const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/confi');
require ('dotenv').config();


//crear el servidor/ aplicacion de express
const app = express();

//BASE DE DATOS
dbConnection();

//DIRECTORIO PUBLICO
app.use(express.static('public'));

//CORS
app.use(cors() );

//LECTURA Y PARSEO DEL BODY
app.use( express.json() );

//RUTAS
app.use('/api/auth', require('./routes/auth') );


app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}` );
});