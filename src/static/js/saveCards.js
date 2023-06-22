// STOP - the navigation to another page stops this js code to take actions to searchPage
// WRITE what you need above this function

function saveCard(event) {
  let openLock = document.querySelector('.open-lock');
  const newElement = document.createElement('div');
  newElement.className = 'closed-lock';

  // Create the inner i element
  const iElement = document.createElement('i');
  iElement.className = 'fa-solid fa-lock';
  iElement.onclick = saveCard; // Assign the onclick event handler

  // Append the i element to the div element
  newElement.appendChild(iElement);

  openLock.replaceWith(newElement);
  console.log(newElement);

  //then let's move to the other page and add the card there and also to the database

}

// function modifyContentOnSavedCardsPage() {
//   // Create an XMLHttpRequest object
//   const xhr = new XMLHttpRequest();

//   // Configure the request
//   xhr.open('GET', 'saved-cards-page.html', true);

//   // Set up the callback for when the request completes
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       // Extract the HTML content from the response
//       const responseHtml = xhr.responseText;

//       // Get the desired content from the temporary container
//       const newContent = tempContainer.querySelector('#all-cards-content');

//       // Append the new content to the current page
//       const targetElement = document.getElementById('all-cards-content');
//       targetElement.appendChild(newContent);
//     } else {
//       console.error('Request failed. Status:', xhr.status);
//     }
//   };

//   // Send the request
//   xhr.send();
// }