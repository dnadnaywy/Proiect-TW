const form = document.getElementById('registration-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();


    alert("test")
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const secondPassword = document.getElementById('confirm-password').value;
    const phonenumber = document.getElementById('phone').value;
    // const birthdate = document.getElementById('birthdate').value;

    if (firstname === "" || lastname === "" || username === "" || email === "" || password === "" || phonenumber === "" || secondPassword === "") {
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
            firstname,
            lastname,
            username,
            email,
            password,
            phonenumber,
           birthdate: "1999-01-01"
        })
    }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
               alert("Registration failed: " + data.message);
                    throw new Error(data.message);
            });
        }
        return response.json();
    })
        .then(data => {
            alert("Registration successful");
            console.log(data);
            window.location.href = '/view/home';
        })
        .catch(err => {
            alert("Registration failed: " + err.message);
        });
});

