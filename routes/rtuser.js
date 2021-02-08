const express = require("express");
const rtuser = express.Router();
const daouser = require("../dao/daouser");

//Form to register a new user
rtuser.get("/nuevousuario", (req, res) => {
  res.render("user", {
    script: true,
    title: "L&F - Nuevo Usuario",
    action: "/usuario/registrarusuario",
    value: "Crear",
  });
});

//Process the registration form
rtuser.post("/registrarusuario", (req, res) => {
  daouser
    .saveUser(req.body)
    .then(() => {
      res.render("user", {
        title: "L&F - Registro Objetos",
        message: true,
        value: "Crear",
      });
    })
    .catch((err) => {
      let errores = {};
      if (err.code == 11000) errores.repetido = true;
      if (err.errors) {
        (errores.usuario = err.errors.usuario),
          (errores.password = err.errors.password);
      }
      res.render("user", {
        usuario: req.body.usuario,
        password: req.body.password,
        script: true,
        title: "L&F - Nuevo Usuario",
        action: "/usuario/registrarusuario",
        value: "Crear",
        errores,
      });
    });
});

//Form to login
rtuser.get("/login", (req, res) => {
  res.render("user", {
    script: true,
    title: "L&F - Inicio Sesión",
    action: "/usuario/login",
    value: "Entrar",
  });
});

//Check the a valid email and password
rtuser.post("/login", (req, res) => {
  daouser
    .userValidation(req.body)
    .then((member) => {
      daouser.findUser(member.usuario).then((user) => {
        if (user == null) {
          res.render("user", {
            usuario: member.usuario,
            script: true,
            title: "L&F - Inicio Sesión",
            action: "/usuario/login",
            value: "Entrar",
            nomatch: true,
          });
        } else {
          daouser
            .checkPassword(member.password, user.password)
            .then((password) => {
              if (password == true && user.status == "inactive") {
                res.render("user", {
                  usuario: req.body.usuario,
                  password: req.body.password,
                  script: true,
                  title: "L&F - Inicio Sesión",
                  action: "/usuario/login",
                  value: "Entrar",
                  inactive: true,
                });
              } else if (password == true && user.status == "active") {
                req.session.autenticado = true;
                req.session.usuario = req.body.usuario;
                req.session.password = req.body.password;
                res.redirect("/");
              } else {
                res.render("user", {
                  usuario: req.body.usuario,
                  password: req.body.password,
                  script: true,
                  title: "L&F - Inicio Sesión",
                  action: "/usuario/login",
                  value: "Entrar",
                  passfalse: true,
                });
              }
            });
        }
      });
    })
    .catch((err) => {
      res.render("user", {
        usuario: req.body.usuario,
        password: req.body.password,
        script: true,
        title: "L&F - Inicio Sesión",
        action: "/usuario/login",
        value: "Entrar",
        err,
      });
    });
});

//Open the profile page
rtuser.get("/perfil", (req, res) => {
  res.render("profile", {
    title: "L&F - Perfil Usuario",
  });
});

//Delete user
rtuser.get("/eliminar", (req, res) => {
  daouser.findUser(req.session.usuario).then((user) => {
    daouser
      .deleteUser(user.usuario)
      .then(() => {
        res.render("confirm", {
          title: "L&F - Usuario Eliminado",
          message: "eliminado",
          action: "registrarusuario",
          link: "Registrar",
        });
      })
      .catch((err) => res.send(err));
  });
});

//Modify password
rtuser.post("/modificar", (req, res) => {
  daouser.userValidation(req.body)
    .then(member => {
      daouser.hashearPassword(member)
        .then(member => {
          console.log
        daouser.modifyUser(member)
        .then(() => {
          res.render("confirm", {
            title: "L&F - Usuario Modificado",
            message: "modificado",
            action: "cerrarsesion",
            link: "Salir",
          });
        })
        })
    })
    .catch((err) => {
      res.render("profile", {
        title: "L&F - Perfil Usuario",
        err,
      });
    });
});

//Confirm a new user
rtuser.get("/confirmar/:id", (req, res) => {
  let id = req.params.id;
  daouser.confirmUser(id).then(
    res.render("confirm", {
      title: "L&F - Usuario Confirmado",
      message: "confirmado",
      action: "login",
      link: "Login",
    })
  );
});

//Close session
rtuser.get("/cerrarsesion", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = rtuser;
