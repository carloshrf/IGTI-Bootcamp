const mongoose = require('mongoose');

const database = 'desafio4';
const collection = 'accounts';

const uri = `mongodb+srv://omnistack:omnistack@cluster0-fwcub.mongodb.net/${database}?retryWrites=true&w=majority`;

module.exports = mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(
  console.log('Conectado ao Mongodb Atlas')
).catch(err => {
  console.log('Erro ao se conectar ', err);
});