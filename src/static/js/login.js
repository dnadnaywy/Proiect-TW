document.querySelector("#toggle-password").addEventListener('click', function (e) {
    let passwordInput = document.querySelector('#password');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

const form = document.getElementById('registration-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    console.log(username, password);

    let isEmail = false;
    let isPhone = false;
    let isUsername = false;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const phoneRegex = /^[0-9]{10,11}$/;

    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    if (usernameRegex.test(username) || emailRegex.test(username) || phoneRegex.test(username)) {
        alert("Valid username");
    }

    fetch("http://localhost:3000/api/authentication/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        ,
        body: JSON.stringify({
            username,
            password
        })
    }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                alert("Login failed: " + data.message);
                throw new Error(data.message);
            });
        }
        return response.json();
    })
        .then(data => {
            alert("Login successful");
            console.log(data);
            window.location.href = '/view/home';
        })
        .catch(err => {
            alert("Login failed: " + err.message);
        });


});
