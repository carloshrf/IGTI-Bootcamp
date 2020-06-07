const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

// Get less extensive name cities
router.get('/lessextensivecityname', async (req, res) => {
  try {
    const allCities = await fs.readFile('./files/rootFiles/Cidades.json', 'utf8');
    const allStates = await fs.readFile('./files/rootFiles/Estados.json', 'utf8');

    const cities = JSON.parse(allCities);
    const states = JSON.parse(allStates);

    const result = []; 
    
    states.forEach(state => {
      const stateCities = cities.filter(city => city.Estado === state.ID);

      const biggestName = stateCities.sort((a, b) => a.Nome.length - b.Nome.length ).slice(0,1);

      const { 0: valor } = Object.assign({}, biggestName);

      result.push(`${valor.Nome} - ${state.Sigla}`);
    });

    return res.json(result.sort((a, b) => a.localeCompare(b)).sort((a, b) => a.length - b.length).slice(0,1));
  } catch (err) {
    console.log(err.message);
  }
});

// Get less extensive name cities
router.get('/mostextensivecityname', async (req, res) => {
  try {
    const allCities = await fs.readFile('./files/rootFiles/Cidades.json', 'utf8');
    const allStates = await fs.readFile('./files/rootFiles/Estados.json', 'utf8');

    const cities = JSON.parse(allCities);
    const states = JSON.parse(allStates);

    const result = []; 
    
    states.forEach(state => {
      const stateCities = cities.filter(city => city.Estado === state.ID);

      const biggestName = stateCities.sort((a, b) => b.Nome.length - a.Nome.length ).slice(0,1);

      const { 0: valor } = Object.assign({}, biggestName);

      result.push(`${valor.Nome} - ${state.Sigla}`);
    });

    return res.json(result.sort((a, b) => b.length - a.length).slice(0,1));
  } catch (err) {
    console.log(err.message);
  }
});

// Get less extensive name cities
router.get('/lessextensivenamecities', async (req, res) => {
  try {
    const allCities = await fs.readFile('./files/rootFiles/Cidades.json', 'utf8');
    const allStates = await fs.readFile('./files/rootFiles/Estados.json', 'utf8');

    const cities = JSON.parse(allCities);
    const states = JSON.parse(allStates);

    const result = []; 
    
    states.forEach(state => {
      const stateCities = cities.filter(city => city.Estado === state.ID);

      const biggestName = stateCities.sort((a, b) => a.Nome.length - b.Nome.length).slice(0,1);

      const { 0: valor } = Object.assign({}, biggestName);

      result.push({city: valor.Nome, uf: state.Sigla});
    });

    return res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

// Get most extensive name cities
router.get('/extensivenamecities', async (req, res) => {
  try {
    const allCities = await fs.readFile('./files/rootFiles/Cidades.json', 'utf8');
    const allStates = await fs.readFile('./files/rootFiles/Estados.json', 'utf8');

    const cities = JSON.parse(allCities);
    const states = JSON.parse(allStates);

    const result = []; 
    
    states.forEach(state => {
      const stateCities = cities.filter(city => city.Estado === state.ID);

      const biggestName = stateCities.sort((a, b) => b.Nome.length - a.Nome.length).slice(0,1);

      const { 0: valor } = Object.assign({}, biggestName);

      result.push({city: valor.Nome, uf: state.Sigla});
    });

    return res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

// Get top 5 states with less cities
router.get('/lesspopulation', async (req, res) => {
  try {
    const allCities = await fs.readFile('./files/rootFiles/Cidades.json', 'utf8');
    const allStates = await fs.readFile('./files/rootFiles/Estados.json', 'utf8');

    const cities = JSON.parse(allCities);
    const states = JSON.parse(allStates);

    const result = states.map(state => {
      const stateCities = cities.filter(city => city.Estado === state.ID);

      return {uf: state.Sigla, cities: stateCities.length};
    });

    const less = result.sort((a, b) => b.cities - a.cities).slice(22, 27);

    return res.json(less);
  } catch (err) {
    console.log(err.message);
  }
});

// Get top 5 states with most cities
router.get('/toppopulation', async (req, res) => {
  try {
    const allStates = await fs.readFile('./files/rootFiles/Estados.json', 'utf8');
    const allCities = await fs.readFile('./files/rootFiles/Cidades.json', 'utf8');
    
    const states = JSON.parse(allStates);
    const cities = JSON.parse(allCities);

    const result = states.map(state => {
      const stateCities = cities.filter(city => state.ID === city.Estado);

      return {uf: state.Sigla, cities: stateCities.length};
    });
    
    const top = result.sort((a, b) => b.cities -a.cities).slice(0,5);

    return res.json(top);
  } catch(err) {
    console.log(err.message);
  }
});

// Get number of cities
router.get('/:uf', async (req, res) => {
  try {
    fs.readFile(`./files/${req.params.uf}.json`, 'utf8').then (data => {

        const cities = JSON.parse(data);

        return res.json({ Total: `${cities.length} cidades em ${req.params.uf.toUpperCase()}` });


    }).catch (err => {
      console.log('Error to get cities quantity, ', err.message);
    });


  } catch (err) {
    throw new Error('ERRO, ', err.message);
  }

});

module.exports = router;