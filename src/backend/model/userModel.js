const sendMessage = require('../utils/sendMessage');
const createUser = async (user, res, pool) => {
    const client = await pool.connect();
    try {
        const query = `INSERT INTO users (username, firstname, lastname, email, password, role, birthdate, phonenumber)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [user.username, user.firstname, user.lastname, user.email, user.password, user.role, user.birthdate, user.phonenumber];

        await client.query(query, values);

        // return {message: 'User created successfully'};
    } catch (err) {
        console.error("Error creating user", err);
        // sendMessage(res, {statusCode: 500, status: 'Internal Server Error', message: 'Error creating user'})
    } finally {
        client.release();
    }
};

const getUser = async (userDetails, res, pool) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users WHERE (username = $1 or email = $1 or phonenumber = $1)';
        const values = [userDetails.username];
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            client.release();
            return null;
        }
        client.release();
        return result.rows[0];

    } catch (error) {
        client.release();
        console.error("Error getting user", error);
        throw error;
    }
}


const deactivateUser = async (username, pool) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE users SET deleted = $1 WHERE username = $2';
        const values = [true, username];
        await client.query(query, values);
        client.release();
        return true;
    } catch (error) {
        client.release();
        console.error("Error deleting account", error);
        throw error;
    }
}

const deleteAllUsersButAdmin = async (res, pool) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM users WHERE role != $1';
        const values = ['admin'];
        await client.query(query, values);
        client.release();
        return true;
    } catch (error) {
        client.release();
        console.error("Error deleting all users", error);
        throw error;
    }
}

// const updateUser = async (user, res, pool) => {
//     const client = await pool.connect();
//     try {
//         const query = `UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4, role = $5, birthdate = $6, phonenumber = $7
//                        WHERE username = $8`;
//         const values = [user.firstname, user.lastname, user.email, user.password, user.role, user.birthdate, user.phonenumber, user.username];
//         await client.query(query, values);
//         client.release();
//         return true;
//     } catch (error) {
//         client.release();
//         console.error("Error updating user", error);
//         throw error;
//     }
// }

const deleteUser = async (username, pool) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM users WHERE username = $1';
        const values = [username];
        await client.query(query, values);
        client.release();
        return true;
    } catch (error) {
        client.release();
        console.error("Error deleting user", error);
        throw error;
    }
}

// const activateUser = async (username, res, pool) => {
//     const client = await pool.connect();
//     try {
//         const query = 'UPDATE users SET deleted = $1 WHERE username = $2';
//         const values = [false, username];
//         await client.query(query, values);
//         client.release();
//         return true;
//     }
//     catch (error) {
//         client.release();
//         console.error("Error activating user", error);
//         throw error;
//     }
//
// }

const getAllUsers = async (pool) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users';
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        client.release();
        console.error("Error getting all users", error);
        throw error;
    }
}

const updateUser = async (user, pool) => {
    const client = await pool.connect();
    try {
        const query = `UPDATE users
                       SET firstname   = $1,
                           lastname    = $2,
                           email       = $3,
                           password    = $4,
                           role        = $5,
                           birthdate   = $6,
                           phonenumber = $7,
                           resetlink = ''
                       WHERE username = $8`;
        const values = [user.firstname, user.lastname, user.email, user.password, user.role, user.birthdate, user.phonenumber, user.username];
        console.log("HERE2")
        await client.query(query, values);
        console.log("HERE3")
        client.release();
        return true;
    } catch (error) {
        client.release();
        console.error("Error updating user", error);
        throw error;
    }
}

const updateUserToken = async (username, resetLink, pool) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE users SET "resetlink" = $1 WHERE username = $2';
        const values = [resetLink, username];
        await client.query(query, values);
        client.release();
        return true;
    } catch (error) {
        client.release();
        console.error("Error updating token", error);
        throw error;
    }
}

const getUserByResetLink = async (resetLink, pool) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users WHERE resetLink = $1';
        const values = [resetLink];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        client.release();
        console.error("Error getting user by reset link", error);
        throw error;
    }

}

module.exports = {
    updateUserToken,
    createUser,
    deleteAllUsersButAdmin,
    deleteUser,
    getUser,
    getAllUsers,
    deactivateUser,
    getUserByResetLink,
    updateUser

};