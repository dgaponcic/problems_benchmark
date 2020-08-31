const logger = require('../logging/winston');

function error_handler(error, req, res, next) {
  if (error) {
    const errorMessage = `${error.code} ${error.message}`;
    error.code >= 500 ? logger.error(errorMessage, error) : logger.warn(errorMessage, error);
    return res.json({
      error: error.message,
    });
  }
  next();
}

module.exports = { error_handler };
