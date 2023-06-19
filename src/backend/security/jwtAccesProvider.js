const jwt = require("jsonwebtoken");
const sendMessage = require('../utils/sendMessage');
const { serialize } = require('cookie');

JWT_SECRETKEY = '12345te42456g9buhbyutrdryeurdcyr67766hren4444425tggrb334556vf';
const handleSecurity = (res, user) => {

    if (user === null) {
        sendMessage(res, {statusCode: 401, status: 'Unauthorized', message: 'Invalid data.'});
    } else {
        let token = generateToken(user, res);
        setCookie(res, token);
        console.log('token', token);
    }
}

const generateToken = (user, res) => {
    const payload = {
        username: user.username,
        role: user.role,
        email: user.email
    };
    return jwt.sign(payload, JWT_SECRETKEY, {expiresIn: '2h'});
}

const setCookie = (res, token) => {
    const options = {
        path: '/',
        httpOnly: true,
    };
    res.setHeader('Set-Cookie', serialize('token', token, options));
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error verifying token', error);
        return null;
    }
}


module.exports = {handleSecurity, verifyToken};