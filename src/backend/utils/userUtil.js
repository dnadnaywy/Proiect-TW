const sendMessage = require("../utils/sendMessage");
const security = require("../security/jwtAccesProvider.js");
const existsUserData = async (userDetails, res, pool) => {
    const client = await pool.connect();
    try {
        if (!await testDataExists('email', userDetails.email, res, 'Email already exists.', client)) return false;

        if(!await testDataExists('username', userDetails.username, res, 'Username already exists.', client)) return false;

        if(!await testDataExists('phonenumber', userDetails.phonenumber, res, 'Phone number already exists.', client)) return false;
        client.release();
        return true;

    } catch (error) {
        client.release();
        console.error("Error retrieving user data ce sa faci", error);
        throw error;
    }
};


const testDataExists = async (typeData, userData, res, textMessage, client) => {
    const query = 'SELECT * FROM users WHERE ' + typeData + ' = $1';
    const values = [userData];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
        sendMessage(res, { statusCode: 400, status: 'Bad Request', message: textMessage });
        client.release();
        return false;
    }
    return true;
};





module.exports = {existsUserData};