var textArray = ["We actually didn't know that much about designing, building or deploying a website before.",
                  "What helped us a lot is the VSCODE pets extension, give it a try, it is, unfortunately, adorable.",
                  "We hope all we did will be appreciated, because we have learned a lot about HTML, CSS, JavaScript and Chart.js until now."
];

function changeText() {
  var randomIndex = Math.floor(Math.random() * textArray.length);
  var randomText = textArray[randomIndex];
  document.querySelector(".text").textContent = randomText;
}

changeText();

setInterval(changeText, 3000);