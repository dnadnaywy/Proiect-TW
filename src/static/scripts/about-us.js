var textArray = ["We actually didn't know that much about designing, building or deploying a website before.",
                  "What helped us a lot is the VScode pets extension, give it a try, it is adorable."
];

function changeText() {
  var randomIndex = Math.floor(Math.random() * textArray.length);
  var randomText = textArray[randomIndex];
  document.querySelector(".text").textContent = randomText;
}

changeText();

setInterval(changeText, 3000);