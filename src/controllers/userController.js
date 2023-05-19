const { errorCode, failCode, successCode } = require("../ultis/respondse");
//Import prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); //tương tự initModel của sequelize

//Function
const createUser = async (req, res) => {
  try {
    const { email, password, fullName, age } = req.body;
    let newData = { email, mat_khau: password, ho_ten: fullName, tuoi: age };
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
                nguoi_dung_id: Number(id)
            }
        })
        successCode(res, "Xoá user thành công", "", 200)
    } else{
        failCode(res, "Id người dùng không tồn tại", id, 404)
    }
  } catch (err){
    errorCode(res, err)
  }
};
module.exports = {
    createUser,
    updateUser,
    deleteUser
}
