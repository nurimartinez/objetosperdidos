const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaUser = new Schema({
  usuario: { 
    type: String, 
    lowercase: true,
    required: [true, 'El email es obligatorio'], 
    index: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v)
      },
      message: 'Introduce un email válido'
    } 
  },
  password: { 
    type: String, 
    required: [true, 'El password es obligatorio'],
    validate: {
      validator: function(v) {
        return /^[a-zÀ-ÿ0-9\u00f1\u00d1\s]{8,}$/i.test(v)
      },
      message: 'Introduce una contraseña válida'
    } 
  },
  status: {type: String, default: "inactive"}
});

schemaUser.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

class User {

}

schemaUser.loadClass(User);
module.exports = mongoose.model("user", schemaUser);
