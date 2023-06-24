const form = document.getElementById('forgot-password-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const jwt = document.getElementById('jwt').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    if (jwt === "" || password === "" || confirmPassword === "") {
        alert("Please fill in every field");
        return;
    }

    fetch("http://localhost:3000/api/authentication/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jwt: jwt,
            password: password
        })
    }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                alert("Send failed: " + data.message);
                throw new Error(data.message);
            });
        }
        return response.json();
    })
        .then(data => {
            alert("Send request successful");
            console.log(data);
            window.location.href = '/view/home';
        })
        .catch(err => {
            alert("Send failed: " + err.message);
        });
});

