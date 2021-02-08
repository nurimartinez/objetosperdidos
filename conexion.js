const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/objetosperdidos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})

module.exports = mongoose.connection




