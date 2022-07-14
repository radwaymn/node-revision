const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const err = new Error("Access denied");
  err.statusCode = 401;
  const token = req.header("x-auth-token");
  if (!token) {
    return next(err);
  }
  const { admin } = jwt.verify(token, process.env.SECRET_KEY);
  if (admin) {
    next();
  } else {
    return next(err);
  }
};
