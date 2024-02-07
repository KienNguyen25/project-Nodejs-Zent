const mongoose = require('mongoose');

//tạo userSchema các trường thông tin mà ta mong muốn
//type => Kiểu dữ liệu
//required => trường có bắt buộc hay không( Có = True, Không = Fale)

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  password : {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true,
    unique: true
  },
  role:{
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;