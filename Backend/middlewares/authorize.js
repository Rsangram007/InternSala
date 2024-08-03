
const jwt = require('jsonwebtoken');


function authorize(...allowedRoles) {
    return (req, res, next) => {
      const { role } = req.user; // req.user should be set by the auth middleware
      if (allowedRoles.includes(role)) {
        next();
      } else {
        res.status(403).send('Access denied');
      }
    };
  }
  
  module.exports = authorize;
  