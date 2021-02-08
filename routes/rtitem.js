const express = require('express')
const rtitem = express.Router()
const daoobject = require('../dao/daoobject')

rtitem.get("/", (req, res) => {
  res.render("register", ({
    script: true,
    title: "L&F - Registro Objetos",
    value: "Crear",
  }))
})

rtitem.post("/guardar", (req, res) => {
  if(req.files != undefined) req.body.foto = `/img/objetos/${req.files.foto.name}`
  daoobject.saveItem(req.body)
    .then( item => {
      if(item.foto != '/img/default.jpg') {
      let doc = req.files.foto
      doc.mv(`./public/img/objetos/${doc.name}`, () => {
        res.render('register', ({
          script: true,
          title: "L&F - Registro Objetos",
          message: true
      }))
    })} else {
      res.render('register', ({
        script: true,
        title: "L&F - Registro Objetos",
        message: true
    }))}
  })
    .catch(err => {
      res.render('register', ({
        script: true,
        title: "L&F - Registro Objetos",
        err: err.errors,
        body: req.body
    }))
  })
})

module.exports = rtitem