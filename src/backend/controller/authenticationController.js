const users = require('../model/userModel');
const {parseJSON, matchJSONProperties} = require('../utils/parseJSON');
const sendMessage = require('../utils/sendMessage');
const {
    registerMissingFields,
    loginMissingFields,
    validateUserDataStructure,
    userNotFound
} = require('../utils/authenticationUtils');
const {existsUserData} = require('../utils/userUtil');
const security = require('../security/jwtAccesProvider.js');
const {encryptedPassword, matchPassword} = require('../security/passwordEncrypted.js');
const config = require('../utils/configuration');
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmailNewsletter");
const authenticationController = async (req, res, pool) => {
    const method = req.method;
    const URL = req.url;
    const endpoint = URL.split('/')[3];

    if (method === 'POST') {
        if (endpoint === 'register') {

            let fields = ['username', 'firstname', 'lastname', 'email', 'password', 'birthdate', 'phonenumber'];
            const user = await parseJSON(req);
            if (!await matchJSONProperties(fields, user, res)) {
                return;
            }

            await registerUser(user, res, pool);

        } else if (endpoint === 'login') {

            let fields = ['username', 'password'];
            const user = await parseJSON(req);
            if (!await matchJSONProperties(fields, user, res)) {
                return;
            }
            await loginUser(user, res, pool);

        } else if (endpoint === 'logout') {

            await logoutUser(res);

        } else if (endpoint === 'forgot-password') {
            await forgotPassword(req, res, pool);
        } else if (endpoint === 'reset-password') {
            await updatePassword(req, res, pool);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }

    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }
}


const registerUser = async (userFields, res, pool) => {

    if (!registerMissingFields(userFields, res)) {
        return;
    }

    if (!validateUserDataStructure(userFields, res)) {
        return;
    }

    if (!await existsUserData(userFields, res, pool)) {
        return;
    }

    let hashPassword = await encryptedPassword(userFields.password);

    userFields.role = config.userRole;

    const user = {
        username: userFields.username,
        firstname: userFields.firstname,
        lastname: userFields.lastname,
        email: userFields.email,
        password: hashPassword,
        role: userFields.role,
        birthdate: userFields.birthdate,
        phonenumber: userFields.phonenumber,

    }

    security.handleSecurity(res, user);

    await users.createUser(user, res, pool);

    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User created successfully'});
}

const loginUser = async (userFields, res, pool) => {
    if (!loginMissingFields(userFields, res)) {
        return;
    }
    const userDatabase = await users.getUser(userFields, res, pool);

    if (userDatabase === null) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'User not found'})
        return;
    }

    if (userDatabase.deleted === true) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'User deleted'})
        return;
    }

    let currentPassword = userFields.password;
    let databaseHashPassword = userDatabase.password;
    if (!await matchPassword(currentPassword, databaseHashPassword, res)) {
        return;
    }

    security.handleSecurity(res, userDatabase);
    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User logged in successfully'});
}

const logoutUser = async (res) => {
    security.deleteCookie(res);
    sendMessage(res, {statusCode: 200, status: 'OK', message: 'User logged out successfully'});
}

const forgotPassword = async (req, res, pool) => {
    const user = await parseJSON(req);
    const userDetails = await userModel.getUser(user, res, pool);
    if (userDetails === null) {
        sendMessage(res, {statusCode: 404, status: 'Not Found', message: 'User not found'});
        return;
    }
    const RESET_PASSWORD_KEY = 'resetpasswordkey'
    const token = jwt.sign({username: userDetails.username}, RESET_PASSWORD_KEY, {expiresIn: '20m'});

    const link = `http://localhost:3000/view/reset-password`;
    const message = "Hi there, your link to reset your password is here.<br>" + link + "<br> and here is the code to reset the password: <br>" + token + "<br>Thank you,<br>BDDSolutions Team<br>"

    if (!await userModel.updateUserToken(userDetails.username, token, pool)) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'reset password token not updated'})
    } else {
        try {
            sendEmail(userDetails.email, message, "Reset Password");
        } catch (e) {
            sendMessage(res, {
                statusCode: 400,
                status: 'Bad Request',
                message: 'Email with reset link password have not been send ' + e.message
            });
            return;
        }
        sendMessage(res, {
            statusCode: 200,
            status: 'OK',
            message: 'Email with reset link password have been send successfully'
        });
    }
}

async function updatePassword(req, res, pool) {
    const details = await parseJSON(req);
    const token = details.jwt;
    const password = details.password;
    if (token) {
        jwt.verify(token, 'resetpasswordkey', async function (err, decodedToken) {
            if (err) {
                sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Incorrect or expired link'});
                return;
            }
            const userDatabase = await userModel.getUserByResetLink(token, pool)
            if (userDatabase === null) {
                sendMessage(res, {statusCode: 404, status: 'Not Found', message: 'User not found'});
                return;
            }
            const hashPassword = await encryptedPassword(password);
            userDatabase.password = hashPassword;
            console.log("HERE")
            if (!await userModel.updateUser(userDatabase, pool)) {
                sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Password not updated'});
                return;
            }
            sendMessage(res, {statusCode: 200, status: 'OK', message: 'Your password has been changed'});
        })
    }
}


module.exports = {authenticationController}