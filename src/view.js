const fs = require('fs');
const {verifyJWTRole} = require("./backend/security/jwtAccesProvider");
const config = require("./backend/utils/configuration");
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
        if (verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        registerView(req, res);
    } else if (URL === '/view/login') {
        if (verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        loginView(req, res);
    } else if (URL === '/view/forgot-password') {
        if (verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        forgotPasswordView(req, res);
    } else if (URL === '/view/reset-password') {
        if (verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        resetPasswordView(req, res);
    } else if (URL === '/view/home') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        homeView(req, res);
    } else if (URL === '/view/about-us') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        aboutUsView(req, res);
    }
    // --------------------- CHART PAGES ------------------
    else if (URL === '/view/country') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        countryView(req, res);
    } else if (URL === '/view/region') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        regionView(req, res);
    } else if (URL === '/view/method-of-attack') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        methodOfAttackView(req, res);
    } else if (URL === '/view/target') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        targetView(req, res);
    } else if (URL === '/view/terrorist-groups') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        terroristGroupsView(req, res);
    } else if (URL === '/view/weapons') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        weaponsView(req, res);
    } else if (URL === '/view/deaths') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        deathsView(req, res);
    } else if (URL === '/view/deaths-us') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        deathsUSView(req, res);
    }
        // else if (URL === '/view/attack') {
        //     attackView(req, res);
        // }
    // --------------------- END ------------------    
    else if (URL === '/view/saved-cards') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        savedCardsView(req, res);
    } else if (URL === '/view/search-page') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        searchView(req, res);
    } else if (URL === '/view/users') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        usersView(req, res);
    } else if (URL === '/view/admin') {
        if (!verifyJWTRole(res, req, config.userRole)) {
            return;
        }
        adminView(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}

function adminView(req, res) {
    const filePath = '../view/users.html';
    readHTML(filePath, res);
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

const forgotPasswordView = (req, res) => {
    const filePath = '../view/forgot-password.html';
    readHTML(filePath, res);
}
const resetPasswordView = (req, res) => {
    const filePath = '../view/reset-password.html';
    readHTML(filePath, res);
}
const aboutUsView = (req, res) => {
    const filePath = '../view/about-us-page.html';
    readHTML(filePath, res);
}

// --------------------- CHART PAGES VIEWS ------------------

const countryView = (req, res) => {
    const filePath = '../view/country.html';
    readHTML(filePath, res);
}

const regionView = (req, res) => {
    const filePath = '../view/region.html';
    readHTML(filePath, res);
}

const methodOfAttackView = (req, res) => {
    const filePath = '../view/method-of-attack.html';
    readHTML(filePath, res);
}

const targetView = (req, res) => {
    const filePath = '../view/target.html';
    readHTML(filePath, res);
}

const terroristGroupsView = (req, res) => {
    const filePath = '../view/terrorist-groups.html';
    readHTML(filePath, res);
}

const weaponsView = (req, res) => {
    const filePath = '../view/weapons.html';
    readHTML(filePath, res);
}

const deathsView = (req, res) => {
    const filePath = '../view/deaths.html';
    readHTML(filePath, res);
}

const deathsUSView = (req, res) => {
    const filePath = '../view/deaths-us.html';
    readHTML(filePath, res);
}

const attackView = (req, res) => {
    const filePath = '../view/attack.html';
    readHTML(filePath, res);
}

const savedCardsView = (req, res) => {
    const filePath = '../view/saved-cards-page.html';
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