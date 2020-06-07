let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');

  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const jsonResponse = await response.json();
  
  allCountries = jsonResponse.map(({
    numericCode: id, 
    translations, 
    population, 
    flag
  }) => {
    return {
      id,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    }
  });

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSumnary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;
    
    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}" />
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;

    countriesHTML += countryHTML;
  });

  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';

  favoriteCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;

    const favoriteCountryHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}" />
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>
  `;

  favoritesHTML += favoriteCountryHTML;
  });
  
  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;

}

function renderSumnary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavoritesPopulation = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavoritesPopulation);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
  
  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });

}

function addToFavorites(id) {
  const countryToAdd = allCountries.find(button => button.id === id)
  
  favoriteCountries = [...favoriteCountries, countryToAdd];
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name); 
    // ordem alfabetica crescente, usando b.name.compare seria inversa
  })

  allCountries = allCountries.filter(country => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(button => button.id === id)
  
  allCountries = [...allCountries, countryToRemove];

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name); 
    // ordem alfabetica crescente, usando b.name.compare seria inversa
  })

  favoriteCountries = favoriteCountries.filter(country => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}