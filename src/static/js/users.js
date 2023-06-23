const searchBar = document.getElementById('searchBar');
const userRows = document.getElementsByClassName('user-row');

searchBar.addEventListener('input', function() {
    const searchTerm = searchBar.value.toLowerCase();

    for (let i = 0; i < userRows.length; i++) {
        const username = userRows[i].querySelector('.username').textContent.toLowerCase();

        if (username.includes(searchTerm)) {
            userRows[i].style.display = 'table-row';
        } else {
            userRows[i].style.display = 'none';
        }
    }
});

// Simulăm datele utilizatorilor

const userData = [
    { nume: 'John Doe', email: 'johndoe@example.com', rol: 'Utilizator' },
    { nume: 'Jane Smith', email: 'janesmith@example.com', rol: 'Admin' },
    // Adăugați mai multe obiecte pentru utilizatori
];

// Funcția pentru generarea rândurilor tabelului
function generateUserRows() {
    const tableBody = document.getElementById('user-data');
    tableBody.innerHTML = '';

    userData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${user.nume}</td>
      <td>${user.email}</td>
      <td>${user.rol}</td>
      <td>
        <button class="delete-button" onclick="confirmDelete()">Șterge</button>
      </td>
    `;
        tableBody.appendChild(row);
    });
}

// Funcție apelată când se apasă butonul de confirmare ștergere
function confirmDelete() {
    deleteUser()
    document.getElementById('delete-modal').style.display = 'block';

}

// Funcție apelată când se apasă butonul de anulare ștergere
function cancelDelete() {
    document.getElementById('delete-modal').style.display = 'none';
}

// Funcție apelată când se confirmă ștergerea utilizatorului
function deleteUser() {
    // Logica pentru ștergerea utilizatorului din baza de date
    console.log('Utilizatorul a fost șters.');
    document.getElementById('delete-modal').style.display = 'none';

    // După ștergere, actualizați tabelul cu utilizatori
    generateUserRows();
}

// Apelați funcția pentru generarea rândurilor tabelului la încărcarea paginii

generateUserRows();
cancelDelete();