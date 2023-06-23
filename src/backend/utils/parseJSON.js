const sendMessage = require('./sendMessage');
const parseJSON = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });
    });
}

const matchJSONProperties = async (fields, user, res) => {
    const userFieldsKeys = Object.keys(user);
    if (fields.length !== userFieldsKeys.length) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Accepted fields are: ' + toString(fields)});
        return false;
    }
    for (let i = 0; i < fields.length; i++) {
        if (!user.hasOwnProperty(fields[i])) {
            sendMessage(res, {
                statusCode: 400,
                status: 'Bad Request',
                message: 'Accepted fields are: ' + toString(user)
            });
            return false;
        }
    }
    return true;
}
const toString = (fields) => {
    let str = '';
    for (let i = 0; i < fields.length; i++) {
        str += fields[i];
        if (i !== fields.length - 1 && fields.length > 1) {
            str += ', ';
        }
    }
    return str;
}

module.exports = {parseJSON, matchJSONProperties};