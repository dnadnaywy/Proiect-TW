const security = require('./backend/security/jwtAccesProvider');
const fs = require('fs');
const path = require('path');
const url = require('url');

const mimeMap = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.json': 'application/json',
    '.txt': 'text/plain',
    '.gif': 'image/gif',
};
const handleViewRequest = (req, res) => {
    const URL = req.url;
    if (URL === '/view/register') {
        registerView(req, res);
    } else if (URL === '/view/login') {
        loginView(req, res);
    } else if (URL === '/view/changePassword') {
        changePasswordView(req, res);
    }
}

const registerView = (req, res) => {
    const filePath = '../frontend/template2/register.html';

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

function handlePublic(url, req, res) {
    let file = fs.readFileSync("./" + url); // which will send any file from public/
    res.end(file);
}

const loginView = (req, res) => {


    const filePath = '../frontend/template2/login.html';

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

const changePasswordView = (req, res) => {

}

module.exports = handleViewRequest;