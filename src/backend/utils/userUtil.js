const sendMessage = require("../utils/sendMessage");

const testExistingUserData = async (userDetails, res, pool) => {
    const client = await pool.connect();
    try {
        let query;
        let values;

        let textMessage = '';

        query = 'SELECT * FROM users WHERE email = $1';
        values = [userDetails.email];
        const emailResult = await client.query(query, values);
        if (emailResult.rows.length > 0) {
            textMessage = 'Email already exists.';
            sendMessage(res, {statusCode: 400, status: 'Bad Request', message: textMessage});
            client.release();
            return false;
        }

        query = 'SELECT * FROM users WHERE username = $1';
        values = [userDetails.username];
        const usernameResult = await client.query(query, values);

        if (usernameResult.rows.length > 0) {
            textMessage = 'Username already exists.';
            sendMessage(res, {statusCode: 400, status: 'Bad Request', message: textMessage});
            client.release();
            return false;

        }

        query = 'SELECT * FROM users WHERE phonenumber = $1';
        values = [userDetails.phonenumber];
        const phonenumberResult = await client.query(query, values);
        if (phonenumberResult.rows.length > 0) {
            textMessage = 'Phonenumber already exists.';
            sendMessage(res, {statusCode: 400, status: 'Bad Request', message: textMessage});
            client.release();
            return false;

        }
        client.release();
        return true;

    } catch (error) {
        client.release();
        console.error("Error retrieving user data ce sa faci", error);
        throw error;
    }
};


module.exports = {testExistingUserData};