const sendMessage = function (res, err) {
    res.statusCode = err.statusCode || 500;
    const errorResponse = {
        status: err.status || 'error',
        message: err.message || 'Error '
    };
    res.end(JSON.stringify(errorResponse));
};

module.exports = sendMessage;