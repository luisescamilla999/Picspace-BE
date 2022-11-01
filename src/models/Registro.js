const mongoose = require('mongoose');
const UsuarioSchema = mongoose.Schema({

        nombre: {
            type: String,
            required: true

        },correo: {
            type: String,
            required: true
            //,unique: true
        },password: {
            type: String,
            required: true
        },confirmPassword:{
            type: String,
            required: true
        }
},{
    timestamps:true
});
 
module.exports = mongoose.model('Registro', UsuarioSchema);//(Nombre del modelo, esquema a utilizar)