const { Router, request } = require('express');
const accountModel = require('../models/Account');

const routes = Router();

routes.get('/', async (request, response) => {
  const accounts = await accountModel.find();

  response.json(accounts);
});

routes.get('/search', async (request, response) => {
  try {
    const { agencia, conta } = request.body;
    
    if (!agencia || !conta) {
      return response.status(401).json({error: '-Agencia and conta- are needed.'});
    }

    const account = await accountModel.findOne({conta, agencia});
    
    if (account) {
      return response.json({balance: account.balance});
    } else {
      throw new Error('Account does not exists');
    }
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
  
});

routes.post('/', async (request, response) => {
  const { agencia, conta, name, balance } = request.body;

  const newAccount = await new accountModel({
    agencia,
    conta,
    name,
    balance,
  }).save();

  return response.json(newAccount);
});

routes.patch('/deposit/:id', async (request, response) => {
  try {
    const hasAccount = await accountModel.findById(request.params.id);

    if (!hasAccount) {
      return response.status(401).json({error: 'Does not exists an account with this ID'});
    }

    const { agencia, conta, balance } = request.body;

    if (!!balance && balance < 0) {
      return response.status(401).json({error: 'Balance must be greater than 0'});
    }

    !!agencia && (hasAccount.agencia = agencia);
    !!conta && (hasAccount.conta = conta);
    !!balance && (hasAccount.balance += balance);

    await accountModel.updateOne({_id: hasAccount.id}, hasAccount)

    return response.status(200).json({balance: hasAccount.balance});
  } catch (err) {
    return response.status(500).json({error: err});
  }
});

routes.patch('/withdrawl', async (request, response) => {
  try {
    const { conta, agencia, value } = request.body;

    const hasAccount = await accountModel.findOne({agencia, conta});

    if (!hasAccount) {
      throw new Error('Account does not exists');
    }

    if (!!value && value < 0) {
      return response.status(401).json({error: 'Value must be greater than 0'});
    }

    if (hasAccount.balance < (value + 1) ) {
      return response.status(401).json({error: 'Not enough cash!'});
    }

    !!value && (hasAccount.balance -= (value + 1));

    await accountModel.updateOne({_id: hasAccount._id}, hasAccount);

    return response.status(201).json({
      balance: hasAccount.balance, 
      message: 'Discounted a withdrawl fee of 1'
    });

  } catch (err) {
    return response.status(500).json({error: err.message})
  }

});

routes.delete('/delete', async (request, response) => {
  try {
    const { conta, agencia } = request.body;

    const deletedAccount = await accountModel.findOneAndDelete({agencia, conta});

    if (!deletedAccount) {
      console.log(deletedAccount)
      return response.status(401).json({error: 'Does not exists an account with this id'});
    }

    const accounts = await accountModel.find();

    return response.status(200).json({'remaining accounts': accounts.length});
  } catch (err) {
    throw new Error({error: err.message});
  }
  
});

module.exports = routes;