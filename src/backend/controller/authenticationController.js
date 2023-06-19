const users = require('../model/userModel');
const parseJSON = require('../utils/parseJSON');
const sendMessage = require('../utils/sendMessage');
const {testMissingFields, validateUserDataStructure} = require('../utils/authenticationUtils');
const {testExistingUserData}= require('../utils/userUtil');
const security = require('../security/jwtAccesProvider.js');
const passwordEncrypted = require('../security/passwordEncrypted.js');
const authenticationController = async (req, res, pool) => {
    const method = req.method;
    const URL = req.url;
    const endpoint = URL.split('/')[3];

    if (method === 'POST') {
        if (endpoint === 'register') {
            const userFields = await parseJSON(req);
            await registerUser(userFields, res, pool);
        }
        else
        {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
        // else if (endpoint === 'sign-in') {
        //     const userFields = await parseJSON(req);
        //     signInUser(userFields, res);
        // }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }
}

const registerUser = async (userFields, res, pool) => {

    userFields.role = 'user';
    if(!testMissingFields(userFields, res)) return;
    if(!validateUserDataStructure(userFields, res)) return;
    if(!await testExistingUserData(userFields, res, pool)) return;

    let hashPassword = await passwordEncrypted(userFields.password);

    const user = {
        username: userFields.username,
        firstname: userFields.firstname,
        lastname: userFields.lastname,
        email: userFields.email,
        password: hashPassword,
        role: userFields.role,
        birthdate: userFields.birthdate,
        phonenumber: userFields.phonenumber
    }

    security.handleSecurity(res, user);

    await users.createUser(user, res, pool);

    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User created successfully'});

}

// function signInUser(userFields, res) {
//
// }


module.exports = {authenticationController}