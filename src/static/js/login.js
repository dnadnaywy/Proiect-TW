document.querySelector("#toggle-password").addEventListener('click', function (e) {
    let passwordInput = document.querySelector('#password');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

const form = document.getElementById('login-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    console.log(username, password);

    fetch("http://localhost:3000/api/authentication/login", {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            username, password
        })
    }).then(response => {
        if (!(response.status !== 200)) {
            return response.json().then(data => {
                if (data.message === "User logged in successfully") {
                    alert("Login successful");
                    window.location.href = '/view/home';
                } else {
                    alert("Login failed: " + data.message);
                    throw new Error(data.message);
                }
            });
        }
        return response.json();
    })
        .then(data => {
            console.log(data);
            window.location.href = '/view/home';
        })
        .catch(err => {
            if (err.message === "User logged in successfully") {
                window.location.href = '/view/home';
            } else {
                alert("Login failed: " + err.message);
            }
        });
});
