const User = require("../model/User");
class UserService {
  register = async (dataUser) => {
    try {
      //Xu ly cac nghiep vu lien quan
      //Goi den tang model
      const user = new User(dataUser);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  };
  getAll = async () => {
    try {
      //goi den model
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      //Xu lý các nghiệp vụ liên quan
      //gọi đến tầng model
      const result = await User.updateOne(
        { _id: id },
        {
          username: data.username,
          email: data.email,
          age: data.age,
          password: data.password,
          phone: data.phone,
          role: data.role
        }
      );
      return true;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      //Xu lý các nghiệp vụ liên quan
      //gọi đến tầng model
      const user = await User.deleteOne({_id: id});
      console.log(user);
      return true;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new UserService();
