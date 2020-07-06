const mongoose = require('mongoose');
require('dotenv').config();

const collection = 'accounts';

const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PSWDB}@cluster0-fwcub.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`;

module.exports = mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(
  console.log('Conectado ao Mongodb Atlas')
).catch(err => {
  console.log('Erro ao se conectar ', err);
});