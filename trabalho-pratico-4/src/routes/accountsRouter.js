const { Router, request } = require('express');
const accountModel = require('../models/Account');

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const accounts = await accountModel.find();

    return response.json(accounts.sort((a, b) => a.agencia - b.agencia));
  } catch(err) {
    return response.status(500).json({error: err.message});
  }
});

routes.get('/agencyaverage/:id', async (request, response) => {
  try {
    const accounts = await accountModel.find({agencia: request.params.id});

    const totalAccounts = accounts.length;
  
    const totalValue = accounts.reduce((accumulator, account) => {
      return accumulator + account.balance;
    }, 0);
    
    return response.json({ averageBalance: (totalValue/totalAccounts).toFixed(2) });
  } catch(err) {
    return response.status(500).json({error: err.message});
  }
});

routes.get('/topbalance/:id', async (request, response) => {
  try {
    const accounts = await accountModel.find();

    const orderedAccounts = accounts.sort((a, b) => b.balance - a.balance);
  
    const topBalanceAccounts = orderedAccounts.slice(0, request.params.id);
  
    return response.json({ topBalanceAccounts });
  } catch(err) {
    return response.status(500).json({error: err.message});
  }
});

routes.get('/bottombalance/:id', async (request, response) => {
  try {
    const accounts = await accountModel.find();

    const orderedAccounts = accounts.sort((a, b) => a.balance - b.balance);
  
    const topBalanceAccounts = orderedAccounts.slice(0, request.params.id);
  
    return response.json({ topBalanceAccounts });
  } catch(err) {
    return response.status(500).json({error: err.message});
  }
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

routes.get('/changeAgency', async (request, response) => {
  try {
    const accounts = await accountModel.find({});

    const agencies = accounts.map(account => account.agencia);
  
    let uniqueAgencies = [...new Set(agencies)]; 

    const topAgenciesAccountsBalances = [];
  
    for (i = 0; i < uniqueAgencies.length; i++) {
      const agencyAccounts = accounts.filter(account => account.agencia === uniqueAgencies[i]);
      
      const currentAccount = agencyAccounts.sort(
        (a, b) => b.balance - a.balance
      ).splice(0, 1);

      if (agencyAccounts.agencia !== 99) {
        topAgenciesAccountsBalances.push(currentAccount[0]);
      }
      
    }

    topAgenciesAccountsBalances.forEach(async (account) => {
      await accountModel.updateOne({_id: account._id}, {agencia: 99});
    });

    const allPrivateAgencyAccounts = await accountModel.find({agencia: 99});

    return response.json({ accounts: allPrivateAgencyAccounts });
  } catch(err) {
    return response.status(500).json(err.message);
  }

});

routes.post('/', async (request, response) => {
  try {
    const { agencia, conta, name, balance } = request.body;

    const newAccount = await new accountModel({
      agencia,
      conta,
      name,
      balance,
    }).save();
  
    return response.json(newAccount);
  } catch(err) {
    return response.status(500).json(err.message);
  }
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

routes.patch('/transfer/:origin/:destiny/:value', async (request, response) => {
  try {
    const {origin, destiny, value} = request.params;

    const originAccount = await accountModel.findOne({conta: origin});
    const destinyAccount = await accountModel.findOne({conta: destiny});
    
    if (originAccount.agencia === destinyAccount.agencia) {
      originAccount.balance -= Number(value);
      destinyAccount.balance += Number(value);
    } else {
      originAccount.balance -= (Number(value) + 8);
      destinyAccount.balance += Number(value);
    }

    await accountModel.replaceOne({_id: originAccount.id}, originAccount);
    await accountModel.replaceOne({_id: destinyAccount.id}, destinyAccount);

    return response.json({originCurrentBalance: originAccount.balance});
  } catch(err) {
    return response.status(500).json({error: err.message});
  }
});

routes.delete('/delete', async (request, response) => {
  try {
    const { conta, agencia } = request.body;

    const deletedAccount = await accountModel.findOneAndDelete({agencia, conta});

    if (!deletedAccount) {
      return response.status(401).json({error: 'Does not exists an account with this id'});
    }

    const accounts = await accountModel.find();

    return response.status(200).json({'remaining accounts': accounts.length});
  } catch (err) {
    throw new Error({error: err.message});
  }
  
});

module.exports = routes;