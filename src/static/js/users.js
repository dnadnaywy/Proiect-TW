async function displayDataFromDatabase() {
    const response = await fetch("http://localhost:3000/api/terrorist-cards");
    try {
        let container = document.querySelector('#all-cards-content');

        const jsonData = await response.json();

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

        console.log(jsonData);
        return await jsonData;
    } catch (error) {
        console.log(error);
    }
}

const seeMoreText = document.querySelectorAll('.see-more-details');

function showAlert(event) {
    alert('Hello world!');
}

async function seeMoreDetails(event) {
    const card = event.target.closest('.card');
    const cardId = card.dataset.cardId;

    const response = await fetch("http://localhost:3000/api/terrorist-card/" + cardId);

    try {
        const jsonData = await response.json();

        let detailsContainer = document.querySelector('#see-more-details-container');
        let cardContainer = document.getElementById('all-cards-content');
        detailsContainer.style.display = "flex";
        cardContainer.style.display = "none";

        let html = '';

        jsonData.forEach(attack => {
            let htmlSegment = `<div class="more-detail-for-card">
                  <i class="fa-solid fa-xmark" onclick="closeSeeMoreDetails()"></i>
                  <br><br>
                  <i class="fa-solid fa-arrow-right"></i>
                  This attack took place in <b>${attack.country}</b>, <b>${attack.region}</b>. The <b>${attack.group_name}</b> targeted <b>${attack.target}</b>.<br>
                  <br>
                  <i class="fa-solid fa-arrow-right"></i> Weapon Type: <b>${attack.weapon_type}</b>. Weapon subtype: <b>${attack.weapon_subtype}.</b><br>
                  <br>
                  <i>This is the summary of the attack:</i>
                  <br><br>
                  <i class="fa-solid fa-arrow-right"></i> ${attack.summary}
                </div>`;
            html += htmlSegment;
        });

        detailsContainer.innerHTML = html;

        console.log(jsonData);
        return await jsonData;
    } catch (error) {
        console.log(error);
    }
}

function closeSeeMoreDetails() {
    let detailsContainer = document.querySelector('#see-more-details-container');
    let cardContainer = document.getElementById('all-cards-content');
    detailsContainer.style.display = "none";
    cardContainer.style.display = "flex";
}