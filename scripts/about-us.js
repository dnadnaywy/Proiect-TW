var textArray = ["We actually didn't know that much about designing, building or deploying a website before."
];

function changeText() {
  var randomIndex = Math.floor(Math.random() * textArray.length);
  var randomText = textArray[randomIndex];
  document.querySelector(".text").textContent = randomText;
}

changeText();

setInterval(changeText, 3000);