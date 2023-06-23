

document.querySelector("#toggle-password").addEventListener('click', function (e) {
    let passwordInput = document.querySelector('#password');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

document.querySelector("#login-form").addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    console.log(username, password);

    let isEmail = false;
    let isPhone = false;
    let isUsername = false;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (emailRegex.test(username)) {
    //     isEmail = true;
    //
    // }
    //
    // const phoneRegex = /^[0-9]{10}$/;
    // if (phoneRegex.test(username)) {
    //     isPhone = true;
    // }
    //
    // const usernameRegex = /^[a-zA-Z0-9._]+$/;
    // if (usernameRegex.test(username)) {
    //     isUsername = true;
    // }
    //
    //
    // if (!isEmail && !isPhone && !isUsername) {
    //     alert("Invalid username");
    //     return;
    // }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).*$/;
    // if (!passwordRegex.test(password) ||password.length > 20) {
    //     alert("Invalid password");
    //     return;
    // }

    fetch("http://localhost:3000/api/authentication/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        ,
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful");
                if (username === config.adminUsername || username === config.adminEmail || username === config.adminPhone)
                    window.location.href = '../../templates/index.html';
                else
                    window.location.href = '/view/home';
            } else {
                alert("Login failed");
            }
        })


});
