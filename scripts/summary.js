var textArray = ["Statistics show that firearms are the most commonly used type of weapon in terrorist attacks, followed by explosives and incendiary devices. The use of chemical and biological weapons is less common but can have a devastating impact.",
  "Statistics show that firearms are the most commonly used type of weapon in terrorist attack",
  "Statistics show that firearms are the most"
];

function changeText() {
  var randomIndex = Math.floor(Math.random() * textArray.length);
  var randomText = textArray[randomIndex];
  document.querySelector(".text").textContent = randomText;
}

changeText();

setInterval(changeText, 3000);