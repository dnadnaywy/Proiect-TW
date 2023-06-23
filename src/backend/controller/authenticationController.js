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
const {sendEmailNewsletter} = require("../utils/sendEmailNewsletter");
const authenticationController = async (req, res, pool) => {
    const method = req.method;
    const URL = req.url;
    const endpoint = URL.split('/')[3];

    if (method === 'POST') {
        if (endpoint === 'register') {

            // let fields = ['username', 'firstname', 'lastname', 'email', 'password', 'birthdate', 'phonenumber'];

            // const copyReq = req;
            // if (!await matchJSONProperties(fields, copyReq, res)) {
            //     return;
            // }

            await registerUser(req, res, pool);

        } else if (endpoint === 'login') {

            let fields = ['username', 'password'];
            if (!await matchJSONProperties(fields, req, res)) {
                return;
            }

            await loginUser(req, res, pool);

        } else if (endpoint === 'logout') {

            await logoutUser(res);

        } else if (endpoint === 'forgot-password') {
            await forgotPassword(req, res, pool);
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


const registerUser = async (req, res, pool) => {

    const userFields = await parseJSON(req);

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

const loginUser = async (req, res, pool) => {
    const userFields = await parseJSON(req);

    if (!loginMissingFields(userFields, res)) {
        return;
    }

    const userDatabase = await users.getUser(userFields, res, pool);
    console.log(userDatabase);

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
    const user = parseJSON(req);
    //  const username = user.username;
    const userDetails = await userModel.getUser(user, pool);
    if (userDetails === null) {
        sendMessage(res, {statusCode: 404, status: 'Not Found', message: 'enter your eamil username or phonenumber'});
        return;
    }

    const userDatabase = await users.getUser();

    const token = jwt.sign(userDatabase.username, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});

    const link = `http://localhost:3000/view/reset-password/${token}`;
    const message = "Hi there, your link to reset your password is here.<br><br></br><br>Thank you,<br>BDDSolutions Team"


    if (!await user.updateUserToken(userDatabase.username, token, pool)) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'reset password token not updated'})
    } else {
        try {
            sendEmailNewsletter(userDatabase.email, "Reset Password", message);
        } catch (e) {
            sendMessage(res, {
                statusCode: 400,
                status: 'Bad Request',
                message: 'Email with reset link password have not been send'
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

async function updatePassword(req, res) {
    const {token, password} = req.body;

    if (token) {
        jwt.verify(token, process.env.RESET_PASSWORD_KEY, async function (err, decodedToken) {
            if (err) {
                sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Incorrect or expired link'});
                return;
            }

            const userDatabase = await userModel.getUserByResetLink(token, userpool)
            if (userDatabase === null) {
                sendMessage(res, {statusCode: 404, status: 'Not Found', message: 'User not found'});
                return;
            }
            const hashPassword = await encryptedPassword(password);
            userDatabase.password = hashPassword;
            if (!await user.updateUser(userDatabase, pool)) {
                sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Password not updated'});
                return;
            }
            sendMessage(res, {statusCode: 200, status: 'OK', message: 'Your password has been changed'});
        })

        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Your reset link is not valid'});
        return;
    }

}


module.exports = {authenticationController}