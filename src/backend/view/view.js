const security = require('../security/jwtAccesProvider');
const fs = require('fs');
const path = require('path');
const handleViewRequest = async (req, res) => {
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

}

const loginView = (req, res) => {
    const login_path = './view/templates/login.html';
    // const decoded = security.decodedJWT(req);
    // console.log(decoded['role']);
    // return;
    // if (decoded) {
    //     if (decoded['role'] === 'user') {
    //         res.writeHead(200, {Location: '/view/home'});
    //         res.end();
    //     } else if (decoded['role'] === 'admin') {
    //         res.writeHead(200, {Location: '/view/users'});
    //         res.end();
    //     }
    // } else {

    // fs.access(login_path, fs.constants.F_OK, (err) => {
    //     if (err) {
    //         console.error('Directory does not exist:', err);
    //     } else {
    //         console.log('Directory exists');
    //     }
    // });
    fs.access(login_path, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Directory does not exist:', err);
        } else {
            console.log('Directory exists');
        }
    });

    res.setHeader('Content-Type', 'text/html');
    fs.readFile(login_path, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.end(data);
        }
    });

    // }

}

const changePasswordView = (req, res) => {

}

module.exports = handleViewRequest;