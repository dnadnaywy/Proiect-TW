var countries = []; // Sample array of countries
var attackTypes = ['Armed Assault', 'Assassination', 'Bombing/Explosion', 'Facility/Infrastructure Attack', 'Hijacking', 'Hostage Taking (Barricade Incident)', 'Hostage Taking (Kidnapping)', 'Unarmed Assault', 'Unknown'];
var checked = false;

var selectedCountries;

var countryFiltersDiv = document.getElementById('countryFilterContainer');
var attackFiltersDiv = document.getElementById('attackTypeFilterContainer');

async function getCountriesName() {
  const response = await fetch("http://localhost:3000/api/countries");
  try {
    const jsonData = await response.json();

    jsonData.forEach(country => {
      countries.push(country.country);
    });
    return await jsonData;
  } catch (error) {
    console.log(error);
  }
}

async function addCountries() {
  await getCountriesName();
  countries.forEach(function (country) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'filter-checkbox';
    checkbox.name = 'country';
    checkbox.value = country;

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.className = 'filters-options';
    label.appendChild(document.createTextNode(country));

    countryFiltersDiv.appendChild(label);
  });

  attackTypes.forEach(function (attackType) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'filter-checkbox';
    checkbox.name = 'attack_type';
    checkbox.value = attackType;

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.className = 'filters-options';
    label.appendChild(document.createTextNode(attackType));

    attackFiltersDiv.appendChild(label);
  });
  checked = true;
}

function applyFilters() {
  selectedCountries = Array.from(document.querySelectorAll('input[name=country]:checked')).map(function (checkbox) {
    return checkbox.value;
  });

  var selectedAttackTypes = Array.from(document.querySelectorAll('input[name=attack_type]:checked')).map(function (checkbox) {
    return checkbox.value;
  });

  console.log(selectedCountries);
  console.log(selectedAttackTypes);

  // Prepare the data to be sent to the server
  var requestData = {
    countries: selectedCountries,
    attackTypes: selectedAttackTypes
  };

  console.log(requestData);

  // Make an AJAX request to the server
  fetch('/api/filtering', {
    method: 'POST', // Or 'GET' depending on your server-side implementation
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function (data) {
      // Handle the response data and update the UI with the filtered results
      console.log(data);
      displayCards(data);
    })
    .catch(function (error) {
      // Handle any errors that occurred during the AJAX request
    });


  // Apply the filters by fetching new data or manipulating the existing data
  // You can use AJAX requests to fetch new data from the server or manipulate the existing data on the client-side

  // Update the UI to display the filtered results
}

async function checkboxer() {
  await addCountries();

  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', applyFilters);
  });
}

checkboxer();

function displayCards(jsonData) {
  console.log('started dispaliyng');
  let container = document.querySelector('#all-cards-content');

  let html = '';
    jsonData.forEach(card => {
      let htmlSegment = `<div class="card" data-card-id="${card.id}">
      <p>Country:</p>           <b><p class="country-name">${card.country}</p></b>
      <p>Region:</p>            <b><p class="region-name">${card.region}</p></b>
      <p>Attack type:</p>       <b><div class="attack-type-name">${card.attack_type}</div></b>
      <p>Weapon Type:</p>       <b><p class="weapon-type-name">${card.weapon_type}</p></b>
      <div class="see-more-details" onclick="seeMoreDetails(event)"><i class="fa-regular fa-eye" title = "Click to see more details!"></i></div> <div class="open-lock"><i class="fa-solid fa-lock-open" onclick="saveCard(event)"></i></div>
    </div>
                                  `;
      html += htmlSegment;
    });

    html += `<div class="pagination">
    <button class="pagination-pages previous-button">Previous Page</button>
    <button class="pagination-pages next-button" current-page="1">Next Page</button>
  </div>`;

    container.innerHTML = html;
}
