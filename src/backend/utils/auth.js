// auth.js
let isLoggedIn = false;

function setLoggedIn(value) {
  isLoggedIn = value;
}

function getLoggedIn() {
  return isLoggedIn;
}

module.exports = {
  setLoggedIn,
  getLoggedIn,
};
