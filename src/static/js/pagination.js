const cardsContainer = document.querySelector('#all-cards-content');
var nextButton;

// import { selectedCountries } from './filtering';
// const selectedAttackTypes = require('./filtering');

document.addEventListener('click', function(event) {
  if (event.target.matches('.next-button')) {
    nextButton = event.target;
    loadNextPage();
  }
});

function loadNextPage() {
  // console.log(nextButton);

  selectedCountries = Array.from(document.querySelectorAll('input[name=country]:checked')).map(function (checkbox) {
    return checkbox.value;
  });
  // console.log(selectedCountries);

  var selectedAttackTypes = Array.from(document.querySelectorAll('input[name=attack_type]:checked')).map(function (checkbox) {
    return checkbox.value;
  });

  const currentPage = nextButton.getAttribute('current-page');
  const nextPage = Number(currentPage) + 1;
  nextButton.setAttribute('current-page', nextPage);

  const xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open('GET', 'http://localhost:3000/api/terrorist-cards?countries=' + (selectedCountries || '') + '&attackTypes=' + (selectedAttackTypes || '') +'&page=' + nextPage, true);

  // Set up the callback for when the request completes
  xhr.onload = function () {
    if (xhr.status === 200) {
      const cardsContent = JSON.parse(xhr.responseText);
      console.log(cardsContent);
      displayGivenPageContent(cardsContent);
    } else {
      console.error('Request failed. Status:', xhr.status);
    }
  };

  xhr.send();
}

function displayGivenPageContent(content) {
  try {
    const currentPage = nextButton.getAttribute('current-page');

    let html = '';
    content.forEach(card => {
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
    <button class="pagination-pages previous-button">Previous Page</button><div class="page-number-buttom">Page: ${currentPage}</div>
    <button class="pagination-pages next-button" current-page="${currentPage}">Next Page</button>
  </div>`;

    cardsContainer.innerHTML = html;

    // console.log(content);
    return content;
  } catch (error) {
    console.log(error);
  }
}
