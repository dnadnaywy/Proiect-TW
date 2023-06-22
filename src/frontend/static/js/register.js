// const config = require("../../../config");
const sendMessage = require("../../../backend/utils/sendMessage");
document.querySelector("#registration-form").addEventListener('submit', function (e) {
    e.preventDefault();

    let firstname = document.querySelector("#firstname").value;
    let lastname = document.querySelector("#lastname").value;
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let phone = document.querySelector("#phone").value;
    let secondPassword = document.querySelector("#confirm-password").value
    let role = "user";

    if (firstname === "" || lastname === "" || username === "" || email === "" || password === "" || phone === "" || secondPassword === "") {
        alert("Please fill in every field");
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).*$/;

    if (password.length < 8 || password.length > 20 || passwordRegex !== passwordRegex) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number");
        return;
    }

    if (password !== secondPassword) {
        alert("Passwords do not match");
        return;
    }

    fetch("http://localhost:3000/api/authentication/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            phone: phone,
            role: role
        })
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful");
                window.location.href = '';
            } else {
                alert("Registration failed");

            }
        })
        .catch(err => {
                alert("Registration failed");
            }
        );
});
