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

const sendEmail = () => {
  const emailInput = document.getElementById("email-input");
  const email = emailInput.value.trim();
  const message = "Hi there, your newsletter confirmation for subscribing to the bddsolutions website is here.";

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "" || !emailRegex.test(email)) {
    console.log("Please enter a valid email address.");
    alert("Please enter a valid email address.");
    return;
  }

  fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Email sent successfully");
        alert("Email sent successfully");
      } else {
        console.log("Failed to send email");
        alert("Failed to send email");
      }
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
};

function showAlert() {
  alert('hello');
}

// Attach the `sendEmail` function to the button click event
const button = document.getElementById("submit-newsletter");
button.addEventListener("click", sendEmail);

