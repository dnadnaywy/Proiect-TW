const security = require('./backend/security/jwtAccesProvider');
const fs = require('fs');

const readHTML = (filePath, res) => {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.end(data);
        }
    });
}

const handleViewRequest = (req, res) => {
    const URL = req.url;
    if (URL === '/view/register') {
        registerView(req, res);
    } else if (URL === '/view/login') {
        loginView(req, res);
    } else if (URL === '/view/changePassword') {
        changePasswordView(req, res);
    } else if(URL === '/view/home') {
        homeView(req, res);
    }
    else if (URL === '/view/method-of-attack') {
        methodOfAttackView(req, res);
    }
    else if (URL === '/view/about-us') {
        aboutUsView(req, res);
    } else if (URL === '/view/country') {
        countryView(req, res);
    } else if (URL === '/view/attack') {
        attackView(req, res);
    }
    else if (URL === '/view/cards') {
        saveCardsView(req, res);
    }
    else if (URL === '/view/search-page') {
        searchView(req, res);
    }
    else if (URL === '/view/users') {
        usersView(req, res);
    }
        else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}

function homeView(req, res) {
    const filePath = '../view/index.html';
    readHTML(filePath, res);
}

const registerView = (req, res) => {
    const filePath = '../view/register.html';
    readHTML(filePath, res);

}

const loginView = (req, res) => {
    const filePath = '../view/login.html';
    readHTML(filePath, res);
}

const changePasswordView = (req, res) => {
    const filePath = '../view/changePassword.html';
    readHTML(filePath, res);
}

const methodOfAttackView = (req, res) => {
    const filePath = '../view/method-of-attack.html';
    readHTML(filePath, res);
}

const aboutUsView = (req, res) => {
    const filePath = '../view/about-us-page.html';
    readHTML(filePath, res);
}

const countryView = (req, res) => {
    const filePath = '../view/country.html';
    readHTML(filePath, res);
}

const attackView = (req, res) => {
    const filePath = '../view/attack.html';
    readHTML(filePath, res);
}

const saveCardsView = (req, res) => {
    const filePath = '../view/save-cards.html';
    readHTML(filePath, res);
}

const searchView = (req, res) => {
    const filePath = '../view/search-page.html';
    readHTML(filePath, res);
}
const usersView = (req, res) => {
    const filePath = '../view/users.html';
    readHTML(filePath, res);
}

module.exports = handleViewRequest;