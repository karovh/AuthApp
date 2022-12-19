const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require ('../helpers/jwt');
const { db } = require('../models/Usuario');

const crearUsuario = async (req, res= response) => {      

    const {email, name, password} = req.body;

    try {
        //Verificar email
        const usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        //Crear usuario con el modelo
        const dbUser = new Usuario( req.body);

        //Hashear contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //Generar JWT
        const token = await generarJWT (dbUser.id, name);

        //Crear usuario DB
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    }catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });        
    }       
}

const loginUsuario = async(req, res = response ) => {
    const { email, password } = req.body;

    try {
        const dbUser = await Usuario.findOne({email});
        if(!dbUser){
            return res.status(400).json({
                ok:false,
                msg: 'El correo no existe'
            });
        }
        //confirmar si el password hace  match
        const validPassword = bcrypt.compareSync(password, dbUser.password)
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }

        //generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });


    }catch (error){
        return res.status(500).json ({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}

const renovarToken = async (req, res = response) => {

    const {uid, name} = req;
    //generar JWT
    const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token        
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}