const express = require('express')
const rtmain = express.Router()
const daoobject = require('../dao/daoobject')

rtmain.get("/", (req, res) => {
  daoobject.listItems()
    .then(list => {
      res.render("index", ({
        title: "L&F - Objetos Perdidos",
        list
      }))
    })  
})

module.exports = rtmain