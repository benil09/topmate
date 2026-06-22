import express from "express"
import { getAllUsers,getUserById,createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

 const userRouter  = express.Router();


userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUserById);
userRouter.post("/createUser",createUser)
userRouter.put("/updateUser/:id",updateUser)
userRouter.delete("/deleteUser/:id",deleteUser)

export default userRouter;