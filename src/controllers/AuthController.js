//import thu vien jwt
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

class AuthController {
  login = async (req, res, next) => {
    try {
      console.log("function login");
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json("Tai khoan khong ton tai!");
      } else {
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.SECRET_KEY_JWT,
          { expiresIn: "20m" }
        );
        return res.status(200).json({
          accessToken: token,
          username: user.username,
          role: user.role,
        });
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new AuthController();
