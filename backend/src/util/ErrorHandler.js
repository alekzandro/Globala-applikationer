const {Logger} = require('./Logger')
const logger = new Logger();

const Logerror = async (err, req, res, next) => {
    logger.logError(err);
    next(err);
}

module.exports = Logerror