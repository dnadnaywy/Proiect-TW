const userModel = require('../model/userModel');
const sendMessage = require('../utils/sendMessage');
const security = require('../security/jwtAccesProvider.js');
const config = require('../utils/configuration');
const {parseJSON, matchJSONProperties} = require('../utils/parseJSON');
const jwt = require("jsonwebtoken");
const {deleteCookie} = require("../security/jwtAccesProvider");
const url = require("url");
const userController = async (req, res, pool) => {
    const method = req.method;
    const URL = req.url;

    if (method === 'GET') {
        if (URL === '/api/users/') {
            await getAllUsers(req, res, pool);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
    } else if (method === 'DELETE') {

        if (URL.startsWith('/api/users/deleteAccount/')) {
            const username = URL.split('/')[4];
            await deleteUser(username, res, pool);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }

}

const deleteUser = async (req, res, pool) => {

    if (!await userModel.deleteUser(req, pool)) {
        sendMessage(res, {statusCode: 500, status: 'Internal Server Error', message: 'Error deleting user'});
        return;
    }
    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User deleted successfully'});
}


const getAllUsers = async (req, res, pool) => {
    const users = await userModel.getAllUsers(pool);
    res.end(JSON.stringify(users));
}


module.exports = {userController};