import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
