import express from "express"
import { getAllUsers,getUserById,createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../dtos/user.dto.js";

 const userRouter  = express.Router();


userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUserById);
userRouter.post("/createUser",validate(createUserSchema),createUser)
userRouter.put("/updateUser/:id",updateUser)
userRouter.delete("/deleteUser/:id",deleteUser)

export default userRouter;