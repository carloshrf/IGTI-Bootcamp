const mongoose = require('mongoose');
const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) throw new Error('You must provide only numbers above zero')
    }
  }
});

const accountModel = mongoose.model('accounts', accountSchema);

module.exports = accountModel;