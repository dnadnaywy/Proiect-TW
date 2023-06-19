const sendMessage = require('../utils/sendMessage');
// const {connect} = require("../server");

const createUser = async (user, res, pool) => {
    const client = await pool.connect();
    try {
        const query = `INSERT INTO users (username, firstname, lastname, email, password, role, birthdate, phonenumber)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [user.username, user.firstname, user.lastname, user.email, user.password, user.role, user.birthdate, user.phonenumber];


        console.log(await client.query(query, values));

        // return {message: 'User created successfully'};
    } catch (err) {
        console.error("Error creating user", err);
        // sendMessage(res, {statusCode: 500, status: 'Internal Server Error', message: 'Error creating user'})
    } finally {
        client.release();
    }
};


module.exports = {createUser};