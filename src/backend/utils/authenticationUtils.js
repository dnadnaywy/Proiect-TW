const sendMessage = require("./sendMessage");
const registerMissingFields = (userFields, res) => {
    let missingFields = [];
    let filledFields = 0;
    for (const field in userFields) {
        if (userFields[field] === '') {
            missingFields.push(field);
        } else filledFields++;
    }

    if (missingFields.length > 0) {
        if (filledFields === 1) {
            let errorMessage = 'Please don\'t let the fields empty. \n We want to put you in a special list.';
            sendMessage(res, {statusCode: 400, status: 'Bad Request', message: errorMessage});
            return false;

        } else if (filledFields > 1) {
            let errorMessage = 'Please share with us your ';

            for (let i = 0; i < missingFields.length; i++) {
                errorMessage += missingFields[i];
                if (i !== missingFields.length - 1) {
                    errorMessage += ', ';
                }
            }

            errorMessage += '. \n Don\'t be shy.';
            sendMessage(res, {statusCode: 400, status: 'Bad Request', message: errorMessage});
            return false;
        }
    }
    return true;
    // sendMessage(res, {statusCode: 200, status: 'OK', message: 'All fields are filled.'})

}

const loginMissingFields = (userFields, res) => {

    if (userFields.username === '' && userFields.password === '') {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'Please fill the username and password fields.'
        });
        return false;
    }

    if (userFields.username === '') {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Please fill the username or email field.'});
        return false;
    }

    if (userFields.password === '') {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Please fill the password field.'});
        return false;
    }

    return true;

}
const validateUserDataStructure = (userFields, res) => {
    if (!validateUsername(userFields.username, res))
        return false;
    if (!validateEmail(userFields.email, res))
        return false;
    if (!validatePassword(userFields.password, res))
        return false;
    if (!validateDate(userFields.birthdate, res))
        return false;
    if (!validatePhonenumber(userFields.phonenumber, res))
        return false;
    return true;
}

const validateUsername = (username, res) => {
    if (username.length < 3) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'Be more generous, your username needs at least 3 characters.'
        });
        return false;
    }

    if (username.length > 15) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'You are too generous, your username needs at most 15 characters.'
        });
        return false;
    }

    const usernameRegex = /^[a-zA-Z0-9.]+$/;
    if (!usernameRegex.test(username)) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'Your username can only contain letters, numbers and dots.'
        });
        return false;
    }
    return true;
}

const validateEmail = (email, res) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Your email is not valid.'});
        return false;
    }
    return true;
}

const validatePassword = (password, res) => {
    if (password.length < 8) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'The password needs at least 8 characters.'
        });
        return false;
    }
    if (password.length > 20) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'The password needs at most 20 characters.'
        });
        return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).*$/;
    if (!passwordRegex.test(password)) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'The password needs at least one uppercase letter, one lowercase letter, one number, one special character and no spaces.'
        });
        return false;
    }
    return true;
}

const validateDate = (birthdate, res) => {
    const userBirthdate = new Date(birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - userBirthdate.getFullYear();
    const permittedAge = 13;

    if (age < permittedAge) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'You need to be at least 13 years old to get access to some content.'
        });
        return false;
    }
    return true;
}

const validatePhonenumber = (phonenumber, res) => {
    if (phonenumber.length < 10 || phonenumber.length > 10) {
        sendMessage(res, {statusCode: 400, status: 'Bad Request', message: 'Your phonenumber needs 10 digits.'});
        return false;
    }
    const phonenumberRegex = /^[0-9]+$/;
    if (!phonenumberRegex.test(phonenumber)) {
        sendMessage(res, {
            statusCode: 400,
            status: 'Bad Request',
            message: 'Your phonenumber can only contain numbers.'
        });
        return false;
    }
    return true;
}


module.exports = {
    registerMissingFields,
    validateUserDataStructure,
    loginMissingFields
}