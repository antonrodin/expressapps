const moment = require('moment');

// Logger Middleware
const logger = (req, res, next) => {
    console.log(`Serve: ${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
}

module.exports = logger;