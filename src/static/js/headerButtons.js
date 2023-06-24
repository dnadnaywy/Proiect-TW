const { getLoggedIn } = require("../../backend/utils/auth");

function renderHeaderButtons() {
  const headerBoard = document.querySelector('.header-board');
  const isLoggedIn = getLoggedIn();
  headerBoard.innerHTML = '';

  if (isLoggedIn) {
    const logoutButton = document.createElement('button');
    logoutButton.classList.add('header-button', 'header-button-left');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', logout);
    headerBoard.appendChild(logoutButton);
  } else {
    const loginButton = document.createElement('button');
    loginButton.classList.add('header-button', 'header-button-left');
    loginButton.textContent = 'Login';
    loginButton.addEventListener('click', redirectToLogin);
    headerBoard.appendChild(loginButton);

    const signupButton = document.createElement('button');
    signupButton.classList.add('header-button', 'header-button-right');
    signupButton.textContent = 'Sign up';
    signupButton.addEventListener('click', redirectToSignup);
    headerBoard.appendChild(signupButton);
  }
}

function logout() {
  localStorage.removeItem('authToken');
}

function redirectToLogin() {
  window.location.href = '/view/login';
}

function redirectToSignup() {
  window.location.href = '/view/register';
}

window.addEventListener('DOMContentLoaded', renderHeaderButtons);