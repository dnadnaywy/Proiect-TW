const {authenticationController} = require('./authenticationController');


const handleApiRequest = async (req, res, pool) => {
    const URL = req.url;
    if (URL.startsWith('/api/authentication')) {
        await authenticationController(req, res, pool);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
        // return;
    }
}


module.exports = handleApiRequest;