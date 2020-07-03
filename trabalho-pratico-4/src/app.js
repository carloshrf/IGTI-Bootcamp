const express = require('express');
const routes = require('./routes/accountsRouter');

require('./config/database');

const app = express();

app.use(express.json());
app.use('/accounts', routes);


app.listen(3000, () => console.log('Servidor iniciado.'));