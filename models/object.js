const mongoose = require('mongoose')
const {Schema} = mongoose

const schemaObject = new Schema({
  nombre: {
    type:String, 
    required: [true, 'El nombre es obligatorio'], 
    minlength: [2, "El nombre debe tener más de dos caracteres"],
    maxlength: [15, "El nombre no debe superar los 15 caracteres"]
  },
  telefono: {
    type:String, 
    required: [true, 'El teléfono es obligatorio'], 
    validate: {
      validator: function(v) {
        return /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/.test(v)
      },
      message: 'Introduce un número de teléfono válido'
    } 
  },
  titulo: {
    type:String,
    required: [true, 'El título es obligatorio'],
    minlength: [3, "El título debe tener más de tres caracteres"], 
    maxlength: [15, "El título no puede tener más de 15 caracteres"]
  },
  descripcion: {
    type:String, 
    required: [true, 'La descripción es obligatoria'],
    minlength:[5, "La descripción debe tener más de cinco caracteres"], 
    maxlength:[35, "La descripción no puede tener más de 35 caracteres"], 
  },
  localizacion: {
    type:String, 
    required: [true, 'La localización es obligatoria'],
    minlength:[3, "La localización debe tener más de tres caracteres"],
    maxlength:[20, "La localización no puede tener más de 20 caracteres"]
  },
  fecha: {type:String, default: Date.now},
  foto: {type:String, default:'/img/default.jpg'}
})


class Object {


}

schemaObject.loadClass(Object)
module.exports = mongoose.model('object', schemaObject)

