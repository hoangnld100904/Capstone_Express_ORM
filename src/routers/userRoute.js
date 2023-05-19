const express = require("express");
const { createUser, updateUser, deleteUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/create-user", createUser )
userRouter.put("/update-user/:id", updateUser )
userRouter.delete("/delete-user/:id", deleteUser)
module.exports = userRouter