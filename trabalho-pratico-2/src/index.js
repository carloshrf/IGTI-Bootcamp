const express = require('express');
const routes = require('./routes/ufRouter');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use('/uf', routes);

app.listen(3000, () => {
  try {
    fs.readFile('./files/rootFiles/Estados.json', 'utf8', (err, data) => {
      if (!err){ 
        const uf = JSON.parse(data);

        uf.forEach(state => {

          fs.readFile(`./files/${state.Sigla}.json`, 'utf8', (err, _) => {
            if (err) {
              fs.readFile(`./files/rootFiles/Cidades.json`, 'utf8', (err, data) => {
                if (!err) {
                  const cities = JSON.parse(data);
                  const city = cities.filter(city => city.Estado === state.ID);
                  
                  fs.writeFile(`./files/${state.Sigla}.json`, JSON.stringify(city), err => {
                    if (err) {
                      console.log('State write error', err.message);
                    }
                  });

                } else {
                console.log('Cities archive missing.', err.message);
                }
              });

            }
          });
        });
      } else {
        console.log('ERRO,', err.message);
      }
    });
  } catch (err) {
    console.log('Error on generating archives', err.message);
  }
});