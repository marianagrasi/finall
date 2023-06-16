//Migracion 
const {Schema, model}=require('mongoose')


const HurtoSchema= Schema({
    //se define tipos de datos
    direccion:{
        type: String,
        required: [true,'La direccion es requerida']

    },
    latitud:{
        type: Number,
        required:[true, 'La latitud es requerida'],
        min: 6.13,
        max: 6.217
       

        
    },

    longitud:{
        
        type: Number,
        required: [true,'La longitud es requerida'],
        max: -75.34,
        min: -75.567
    },

    descripcion:{
        type: String,
        required: [true,'La descripcion es requerida']

    },

    fecha:{
        type: Date,
        default: Date.now,
        required: [true,'La fecha es requeridad']

    }

 
})
//este es el nombre del objeto Hurto
module.exports = model('Hurto', HurtoSchema)//Exportar el modelo


