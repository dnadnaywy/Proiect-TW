const additionalCountries = ['India', 'Russia', 'Mexico']; // Add more countries here

const countryFilterContainer = document.getElementById('countryFilterContainer');
const countrySearchInput = document.getElementById('countrySearchInput');
const attackTypeFilterContainer = document.getElementById('attackTypeFilterContainer');
const filterCheckboxes = document.getElementsByClassName('filter-checkbox');
const cards = document.getElementsByClassName('card');

// Function to add additional countries to the filter container
function addAdditionalCountries() {
  additionalCountries.forEach((country) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'filter-checkbox';
    checkbox.dataset.filterCategory = 'country';
    checkbox.dataset.filterValue = country.toLowerCase();

    const label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(country));

    countryFilterContainer.appendChild(label);
  });
}

// Add additional countries to the filter container
addAdditionalCountries();

// Function to filter cards based on the selected filters and search input
function filterCards() {
  const selectedFilters = {};

  Array.from(filterCheckboxes).forEach((checkbox) => {
    if (checkbox.checked) {
      const filterCategory = checkbox.dataset.filterCategory;
      const filterValue = checkbox.dataset.filterValue;

      if (!selectedFilters[filterCategory]) {
        selectedFilters[filterCategory] = [];
      }

      selectedFilters[filterCategory].push(filterValue);
    }
  });

  const searchInput = countrySearchInput.value.trim().toLowerCase();

  Array.from(cards).forEach((card) => {
    const countryName = card.getElementsByClassName('country-name')[0].textContent.toLowerCase();
    const regionName = card.getElementsByClassName('region-name')[0].textContent.toLowerCase();
    const attackTypeName = card.getElementsByClassName('attack-type-name')[0].textContent.toLowerCase();

    let matchesFilter = true;

    for (const filterCategory in selectedFilters) {
      const filterValues = selectedFilters[filterCategory];
      const cardValue = filterCategory === 'country' ? countryName : filterCategory === 'attack-type' ? attackTypeName : regionName;

      if (!filterValues.includes(cardValue)) {
        matchesFilter = false;
        break;
      }
    }

    const matchesSearch = searchInput === '' || countryName.includes(searchInput);

    if (matchesFilter && matchesSearch) {
      card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}

// Event listeners
Array.from(filterCheckboxes).forEach((checkbox) => {
  checkbox.addEventListener('change', filterCards);
});

countrySearchInput.addEventListener('input', filterCards);

// Function to filter country options based on search input
function filterCountryOptions() {
  const searchInput = countrySearchInput.value.trim().toLowerCase();
  const countryOptions = countryFilterContainer.getElementsByTagName('label');

  Array.from(countryOptions).forEach((option) => {
    const countryName = option.textContent.toLowerCase();
    if (countryName.includes(searchInput)) {
      option.style.display = 'grid';
    } else {
      option.style.display = 'none';
    }
  });
}

// Event listener for search input on countryFilterContainer
countrySearchInput.addEventListener('input', filterCountryOptions);
