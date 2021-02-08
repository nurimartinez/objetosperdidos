const User = require("../models/user");
const mailer = require("../modules/mailer");
const bcrypt = require("bcrypt");

const daouser = {};

//Register a new user and check if the email exists
daouser.saveUser = function saveUser(user) {
  return new Promise((resolve, reject) => {
    let member = new User(user);
    member.save()
      .then((member) => {
        mailer.send(member);
        resolve(member);
      })
      .catch((error) => reject(error));
  });
};

//Validate the data when tryong to login
daouser.userValidation = function userValidation(user) {
  return new Promise((resolve, reject) => {
    let member = new User(user);
    let error = {};
    error = member.validateSync();
    if (error == undefined) resolve(member)
    else reject(error)   
  });
};

//Find an email in the database
daouser.findUser = function findUser(email) {
  return new Promise((resolve, reject) => {
    resolve(User.findOne({usuario: email}))
  })
}

//Check if the password is correct
daouser.checkPassword = function checkPassword(passwordNew, passwordReal){
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordNew, passwordReal)
      .then(res => resolve(res))
  }) 
}

//Delete user
daouser.deleteUser = function deleteUser(email) {
  return new Promise((resolve,reject) => {
    User.deleteOne( { usuario: email} )
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

//Hashear password
daouser.hashearPassword = function hashearPassword(member) {
  return new Promise((resolve,reject) => {
    bcrypt.hash(member.password, 10)
    .then((hash) => {
      member.password = hash;
      resolve(member)
  }) 
})
}

//Modify password
daouser.modifyUser = function modifyUser(user) {
  return new Promise((resolve, reject) => {
    User.updateOne({usuario: user.usuario}, {$set: {password: user.password}})
    .then(res => resolve(res))
})
}

//Confirm a new user
daouser.confirmUser = function confirmUser(id) {
  return new Promise((resolve, reject) => {
    User.updateOne({_id: id}, {$set: {status: "active"}})
    .then(res => resolve(res))
})
}

module.exports = daouser;
