const { errorCode, failCode, successCode } = require("../ultis/respondse");
const { generateToken, checkToken, decodeToken } = require("../ultis/jwt");
//Import prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); //tương tự initModel của sequelize
//Import Bcrypt
const bcryptjs = require("bcryptjs");
//Function
const createUser = async (req, res) => {
  try {
    const { email, password, fullName, age } = req.body;
    let newData = {
      email,
      mat_khau: bcryptjs.hashSync(password, 10),
      ho_ten: fullName,
      tuoi: age,
    };
    await prisma.nguoi_dung.create({ data: newData });
    successCode(res, "Tạo user thành công", newData, 201);
  } catch (err) {
    errorCode(res, err);
  }
};
const updateUser = async (req, res) => {
  try {
    const { email, password, fullName, age } = req.body;
    const { id } = req.params;
    let checkUser = prisma.nguoi_dung.findOne({
      where: {
        nguoi_dung_id: Number(id),
      },
    });
    if (checkUser) {
      let newData = { email, mat_khau: password, ho_ten: fullName, tuoi: age };
      await prisma.nguoi_dung.update({
        where: {
          nguoi_dung_id: Number(id),
        },
        data: newData,
      });
      successCode(res, "Update user thành công", newData, 200);
    } else {
      failCode(res, "Id người dùng không tồn tại", id, 404);
    }
  } catch (err) {
    errorCode(res, err);
  }
};
const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let checkUser = prisma.nguoi_dung.findOne({
      where: {
        nguoi_dung_id: Number(id),
      },
    });
    if (checkUser) {
      await prisma.nguoi_dung.delete({
        where: {
          nguoi_dung_id: Number(id),
        },
      });
      successCode(res, "Xoá user thành công", "", 200);
    } else {
      failCode(res, "Id người dùng không tồn tại", id, 404);
    }
  } catch (err) {
    errorCode(res, err);
  }
};
const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, age } = req.body;
    let checkUser = prisma.nguoi_dung.findOne({
      where: {
        email: email,
      },
    });
    if (!checkUser){
      let newData = {
        email,
        mat_khau: bcryptjs.hashSync(password, 10),
        ho_ten: fullName,
        tuoi: age,
      };
      await prisma.nguoi_dung.create({ data: newData });
      successCode(res, "Đăng ký thành công", newData, 201);
    } else{
      failCode(res, "Email đã được sử dụng", email, 400)
    }
  } catch (err) {
    errorCode(res, err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let checkUser = prisma.nguoi_dung.findOne({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      let checkPassword = bcryptjs.compareSync(password, checkUser.password)
      if (checkPassword) {
        let userData = {
          email,
          role:"user"
        }
        let token = generateToken(userData)
        successCode(res, "Login thành công", token, 200)
      } else{
        failCode(res, "Mật khẩu không đúng", "", 400)
      }
    } else{
      failCode(res, "Email chưa được đăng ký tài khoản", "", 404)
    }
  } catch (err) {
    errorCode(res, err);
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser
};
