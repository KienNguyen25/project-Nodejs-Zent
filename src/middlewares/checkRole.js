const jwt = require("jsonwebtoken");
const User = require("../model/User");

checkRole = (req, res, next) => {
  const role = req.role;
  const username = req.username;
  const user = User.findOne({username})
  if (user && role == 'ADMIN') {
    next()
  } else {
    return res.status(403).json('USER Khong Co Quyen Xu Ly')
  }
};

module.exports = checkRole;
