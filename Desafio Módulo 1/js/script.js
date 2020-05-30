window.addEventListener('load', () => {
  let allUsers = [];
  let filteredUsers = [];
  let ageSum = 0;
  let ageAverage = 0;
  let maleGen = 0;
  let femaleGen = 0;
  let results = 0;

  getUsers();

  const resultsCounterLabel = document.querySelector('#results-label');
  const userSearchContainer = document.querySelector('#users-container');
  const maleSpan = document.querySelector('#male-gen');
  const femaleSpan = document.querySelector('#female-gen');
  const ageSumSpan = document.querySelector('#age-sum');
  const ageAverageSpan = document.querySelector('#age-average');
  document.querySelector('#search-input').addEventListener('keyup', usersFilter);

  function usersFilter(e) {
    filteredUsers = allUsers.filter(({name}) =>
      name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    userSearchContainer.innerHTML = '';

    ageOperations();
    updateStatistics();
    render();
  }

  async function getUsers() {
    const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const { results } = await response.json();
   
    allUsers = results.map(user => {
      return {
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        picture: user.picture.thumbnail,
        age: user.dob.age,
      }
    });
    
    filteredUsers = allUsers;
    
    ageOperations();
    updateStatistics();
    render();
  }

  function createUserContainer() {
    const userContainer = document.createElement('div');
    userContainer.id = 'user-info';

    const image = document.createElement('img');
    image.id = 'user-avatar';

    const nameSpan = document.createElement('span');
    nameSpan.id = 'name';

    const yarsSpan = document.createElement('span');
    yarsSpan.id = 'age';

    return {
      userContainer,
      image,
      nameSpan,
      yarsSpan  
    }
  }

  function updateStatistics() {
    femaleGen = 0;
    maleGen = 0;
    results = 0;

    filteredUsers.forEach(user => {
      if (user.gender === 'female') {
        ++femaleGen;
      }
      if (user.gender === 'male') {
        ++maleGen;
      }
    });

    maleSpan.textContent = `Sexo masculino: ${maleGen}`;
    femaleSpan.textContent = `Sexo feminino: ${femaleGen}`;

    !!filteredUsers.length ? (
        resultsCounterLabel.textContent = `${filteredUsers.length} usuário(s) encontrado(s)`
      ) : 
      (
        resultsCounterLabel.textContent = `Nenhum usuário correspondente à busca`
      );
  }

  function ageOperations() {
    ageSum = 0;
    ageAverage = 0;
    
    filteredUsers.forEach(user => {
      ageSum += user.age;
    });
    
    ageAverage = ageSum/filteredUsers.length;

    ageSumSpan.textContent = `Soma das idades: ${ageSum}`;
    !!ageAverage ? (ageAverageSpan.textContent = `Média das idades:  ${Math.round(ageAverage)}`) : ageAverageSpan.textContent = `Média das idades:  0`;

  }

  function render() {
    filteredUsers.map(({picture, name, age}) => {
      const { 
        userContainer,
        image, 
        nameSpan, 
        yarsSpan 
      } = createUserContainer();

      image.src = `${picture}`;
      nameSpan.textContent = `${name}, `;
      yarsSpan.textContent = `${age} anos`;

      userContainer.append(image, nameSpan, yarsSpan);

      userSearchContainer.append(userContainer);
    });

  }

});
