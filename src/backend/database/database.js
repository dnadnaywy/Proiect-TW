const config = require("../utils/configuration");
const {encryptedPassword} = require("../security/passwordEncrypted");

const databaseInitialization = async (pool) => {
    try {
        const client = await pool.connect();


        const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "users"
    (
        "id"          SERIAL PRIMARY KEY,
        "username"    VARCHAR(255) NOT NULL,
        "firstname"   VARCHAR(255) NOT NULL,
        "lastname"    VARCHAR(255) NOT NULL,
        "email"       VARCHAR(255) NOT NULL,
        "password"    VARCHAR(255) NOT NULL,
        "role"        VARCHAR(255) NOT NULL,
        "birthdate"   DATE         NOT NULL,
        "phonenumber" VARCHAR(255) NOT NULL,
        "created_at"  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "deleted"     BOOLEAN      NOT NULL DEFAULT FALSE
    );`;


        const insertAdminAccountQuery = `INSERT INTO users (username, firstname, lastname, email, password, role, birthdate,
                                                    phonenumber)
                                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;


        await client.query(createTableQuery);

        const adminRow = await client.query('SELECT * FROM users WHERE role = $1', [config.adminRole]);
        const values = [config.adminUsername, config.adminFirstname, config.adminLastname, config.adminEmail, await encryptedPassword(config.adminPassword), config.adminRole, config.adminBirthdate, config.adminPhonenumber];

        if (adminRow.rows.length === 0) {
            await client.query(insertAdminAccountQuery, values);
        } else {
            const modifyAdminAccountQuery = `UPDATE users
                                             SET username    = $1,
                                                 firstname   = $2,
                                                 lastname    = $3,
                                                 email       = $4,
                                                 password    = $5,
                                                 role        = $6,
                                                 birthdate   = $7,
                                                 phonenumber = $8
                                             WHERE role = $6`;
            await client.query(modifyAdminAccountQuery, values);
        }

        client.release();
        return true;

    } catch (error) {
        console.error(error.stack);
        return false;
    }

};



module.exports = databaseInitialization;