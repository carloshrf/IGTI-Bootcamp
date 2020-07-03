const { Router } = require('express');
const accountModel = require('../models/Account');

const routes = Router();

routes.get('/', async (request, response) => {
  const accounts = await accountModel.find();

  response.json(accounts);
});

routes.post('/', async (request, response) => {
  const { agencia, conta, name, balance } = request.body;

  const newAccount = await new accountModel({
    agencia,
    conta,
    name,
    balance,
  }).save();

  response.json(newAccount);
});

routes.patch('/:id', async (request, response) => {

  const hasAccount = await accountModel.findById(request.params.id);

  if (!hasAccount) {
    response.status(401).json({error: 'Does not exists an account with this ID'});
  }

  console.log('aaaaaaaaaaaaaaaaaaaaaaa');

  // const { name, agencia, conta, balance } = request.body;

  // if (!!balance && balance <= 0) {
  //   response.status(401).json({error: 'Balance must be greater than 0'});
  // }

  // console.log('Não deveria chegar aqui...');

  // !!name && (hasAccount.name = name);
  // !!agencia && (hasAccount.agencia = agencia);
  // !!conta && (hasAccount.conta = conta);
  // !!balance && balance > 0 && (hasAccount.balance += balance);

  // await accountModel.updateOne({_id: hasAccount.id}, hasAccount)

  response.status(200).json({conta: hasAccount});
  
  });

module.exports = routes;