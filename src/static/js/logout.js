const logoutButton = document.getElementById('logout-button');

function logoutUser(e) {
    e.preventDefault();

    fetch('http://localhost:3000/api/authentication/logout', {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => {
            if (response.ok) {
                console.log('Logout successful')
                window.location.href = "/view/login";
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => console.error('Error:', error));
}

logoutButton.addEventListener('click', logoutUser);
