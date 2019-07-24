// middleware/auth.js

const passport = require('passport');

module.exports = function authMiddleware(req, res, next) {
  const whiteList = ['/api/users/login', '/api/users/register', '/api/services/home'];
  if (whiteList.find((item) => {
    return req.originalUrl.startsWith(item)
  })) {
    next();
  } else {
    passport.authenticate('jwt', { session: false })(req, res, next)
  }
}