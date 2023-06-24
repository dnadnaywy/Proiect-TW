const sendMessage = function (res, err) {
    res.statusCode = err.statusCode || 500;
    res.end(err.message || 'Internal Server Error');
};

module.exports = sendMessage;