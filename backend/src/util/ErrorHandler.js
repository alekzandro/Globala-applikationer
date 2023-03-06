const { Logger } = require('./Logger');
const logger = new Logger();

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.logError(err);

  if (err.status === 404) {
    res.status(404).render('404', { title: '404 Page Not Found' });
  } else if (err.status === 500) {
    res.status(500).render('500', { title: '500 Internal Server Error' });
  } else if (err.status === 503) {
    res.status(503).render('503', { title: '503 Service Unavailable' });
  } else {
    res.status(500).render('error', { title: 'Error', error: err });
  }
};

module.exports = errorHandler;