const UserService = require("../services/UserService");

class UserController {
  //Cac ham xy ly
  getAll = async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json({
        users,
      });
    } catch (error) {
      throw error;
    }
  };

  //assync, await xu ly bat dong bo
  register = async (req, res, next) => {
    try {
      const { username, email, phone, age, password } = req.body;
      let data = {
        username,
        email,
        phone,
        age,
        password,
      };
      const user = await UserService.register(data);
      console.log("Create a user success");
      res.status(200).json({
        user,
      });
    } catch (error) {
      throw error;
    }
  };

  update = async (req, res, next) => {
    try {
      const { username, email, phone, age, password,role } = req.body;
      const { id } = req.params;
      console.log("updated user");
      let data = {
        username,
        email,
        phone,
        age,
        password,
        role
      };
      const result = await UserService.update(id, data);
      if (result) {
        return res.status(200).json({ msg: "updated success" });
      } else {
        throw new Error("updated fail");
      }
    } catch (error) {
      throw error;
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await UserService.delete(id);

      if (result) {
        res.status(200).json({ msg: "Deleted success" });
      } else {
        throw new Error("Deleted fail");
      }
      // let id = req.params.id;
      // res.status(200).json({msg: `Xoa User co id = ${id}`});
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserController();
