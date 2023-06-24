const userModel = require('../model/userModel');
const sendMessage = require('../utils/sendMessage');
const security = require('../security/jwtAccesProvider.js');
const config = require('../utils/configuration');
const {parseJSON, matchJSONProperties} = require('../utils/parseJSON');
const jwt = require("jsonwebtoken");
const {deleteCookie} = require("../security/jwtAccesProvider");
const userController = async (req, res, pool) => {
    const method = req.method;
    const URL = req.url;

    if (method === 'GET') {
        if (URL === '/api/users/') {
            await getAllUsers(res, pool);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
    } else if (method === 'DELETE') {

        if (URL === '/api/users/deleteAccount') {
            await deleteUser(req, res, pool);
        } else if (URL === '/api/users/deleteUserByAdmin') //posibil altceva
        {
            // await matchJSONProperties(['username'], req, res);
            await deleteUserByAdmin(req, res, pool);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }

}

const deleteUser = async (req, res, pool) => {

    const decoded = security.decodedJWT(req);

    if(!decoded){
        res.end('No cookie, no jwt, no user, no admin no no no');
        return;
    }

    await userModel.deactivateUser(decoded['username'], pool);

    security.deleteCookie(res);

    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User deleted successfully'});
}

const deleteUserByAdmin = async (req, res, pool) => {
    console.log('aaaa'+req+'aaaa');

    if (!security.verifyJWTRole(res, req, config.adminRole)) {
        return;
    }

    console.log('aaaa'+req+'aaaa');
    const user = parseJSON(req);
    const username = user.username;
    console.log('aanbbbba'+req+'aajbjobjubaa');

    await userModel.deleteUser(username, pool);
    if(username===config.adminUsername)
        security.deleteCookie(res);
    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User deleted successfully'});
}

const getAllUsers = async (req, res, pool) => {

    if (security.verifyJWTRole(req, res, config.adminRole) === false) return;

    const users = await userModel.getAllUsers(pool);
    // let userMap = users.map(user => {
    //     return {
    //         id: user.id,
    //         username: user.username,
    //         firstname: user.firstname,
    //         lastname: user.lastname,
    //         email: user.email,
    //         birthdate: user.birthdate,
    //         phonenumber: user.phonenumber,
    //         role: user.role,
    //         deleted: user.deleted
    //     }
    // });
    res.end(JSON.stringify(users));
}



module.exports = {userController};