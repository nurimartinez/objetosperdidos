const express = require("express");
const app = express();
const fileUpload = require("express-fileUpload");
const daoobject = require('./dao/daoobject')
const session = require("express-session");

//Template engine
const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

//Middlewares
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

let privateRoutes = ["/registro", "/usuario/cerrarsesion"];
app.use((req, res, next) => {
  if (req.session.autenticado) {
    res.locals.session = req.session;
    next();
  } else {
    if (privateRoutes.includes(req.url) == true) {
      daoobject.listItems().then((list) => {
        res.render("index", {
          title: "L&F - Objetos Perdidos",
          list,
        });
      });
    } else next();
  }
});

//MongoDB
const conexion = require("./conexion");
conexion.on("error", console.error.bind(console, "Error de conexión MongoDB"));
conexion.once("open", () => console.log("Conexión MongoDB OK"));

//Routes
const rtmain = require("./routes/rtmain");
const rtitem = require("./routes/rtitem");
const rtuser = require("./routes/rtuser");
app.use("/", rtmain);
app.use("/registro", rtitem);
app.use("/usuario", rtuser);

//Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
