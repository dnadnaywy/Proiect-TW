window.onload = function () {
    fetchAllUsers();
}

let users = [];
let userToBeDeleted = null;

async function fetchAllUsers() {
    const response = await fetch(
        'http://localhost:3000/api/users/',
        {method: 'GET'});
    users = await response.json();

    const table = document.getElementById('userTable');

    users.forEach(user => {
        if (user.role !== 'admin') {
            let row = table.insertRow();
            let usernameCell = row.insertCell(0);
            let emailCell = row.insertCell(1);
            let deleteCell = row.insertCell(2);

            usernameCell.innerHTML = user.username;
            emailCell.innerHTML = user.email;
            deleteCell.innerHTML = '<button onclick="confirmDelete(\'' + user.username + '\')">Sterge</button>';
        }
    });
}

function confirmDelete(username) {
    userToBeDeleted = username;
    document.getElementById('confirmModal').style.display = "block";
}

document.getElementById('confirmDelete').onclick = function() {
    deleteUser(userToBeDeleted);
    document.getElementById('confirmModal').style.display = "none";
}

document.getElementById('cancelDelete').onclick = function () {
    document.getElementById('confirmModal').style.display = "none";
}

async function deleteUser(username) {
    const response = await fetch("http://localhost:3000/api/users/deleteAccount/" + username, {method: 'DELETE'});

    if (response.ok) {
        location.reload();
    } else {
        console.error('Failed to delete user');
    }
}
