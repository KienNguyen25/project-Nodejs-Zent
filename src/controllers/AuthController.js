//import thu vien jwt
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

class AuthController {
  login = async (req, res, next) => {
    try {
      console.log("function login");
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json("Tai khoan khong ton tai!");
      } else {
        const token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.SECRET_KEY_JWT,
          { expiresIn: "20m" }
        );
        return res.status(200).json({
          accessToken: token,
          email: user.email,
          role: user.role,
        });
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new AuthController();
