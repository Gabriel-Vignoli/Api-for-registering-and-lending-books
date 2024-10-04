const HttpError = require("../errors/HttpError");

module.exports = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  } else if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};
