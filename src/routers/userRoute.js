const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const { checkToken, privateAPI } = require("../ultis/jwt");

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.put("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", deleteUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
module.exports = userRouter;
