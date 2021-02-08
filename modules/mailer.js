const nodemailer = require("nodemailer");

const mailer = {};

mailer.send = function send(user) {

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: "aletha.rogahn10@ethereal.email", 
      pass: "R7zQVTfcBRRtQPnA17"
    },
  });

  transporter.sendMail({
    from: 'Lost & Found', 
    to: user.usuario, 
    subject: "Bienvenido a Lost & Found",
    text: `Hola, ${user.usuario}`, 
    html: `<main style="background-color: gray; text-align: center; padding: 50px 30px;">
            <img src="http://localhost:3000/img/logo.png" width="200" />
            <h1 style="color: white;">¡Bienvenido a Lost & Found!</h1>
            <p style="width: 70%; margin: 10px auto; line-height: 20px;">Acabas de registrarte en nuestra página, pero aún necesitas confirmar tu email. Una vez lo hayas hecho, podrás registrar objetos perdidos siempre que quieras. También podrás ver los objetos perdidos disponibles. Confirma tu email <a href="http://localhost:3000/usuario/confirmar/${user._id}" style="text-decoration: none; color: white; font-weight: bold;">aquí</a></p>`, 
  });

}

module.exports = mailer