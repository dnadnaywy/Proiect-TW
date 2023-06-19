const bcrypt = require('bcryptjs');

number = 12;

async function secretPassword(password) {
    return await bcrypt.hash(password, number);
}

module.exports = secretPassword;