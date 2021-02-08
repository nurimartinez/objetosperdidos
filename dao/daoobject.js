const Object = require('../models/object')

const daoobject = {}

//Save object in MongoDB
daoobject.saveItem = function saveItem(object) {
  return new Promise((resolve, reject) => {
    let item = new Object(object)
    item.save()
      .then(item => resolve(item))
      .catch(error => reject(error))
  })
}

//List the objects in MongoDB
daoobject.listItems = function listItems() {
  return new Promise ((resolve, reject) => {
    resolve(Object.find().lean())
  })
}



module.exports = daoobject