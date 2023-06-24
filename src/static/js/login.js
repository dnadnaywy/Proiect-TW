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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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


    }
)
;
