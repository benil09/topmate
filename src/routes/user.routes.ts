import express from "express"
import { getAllUsers,getUserById,createUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../dtos/user.dto.js";

 const userRouter  = express.Router();


userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUserById);
userRouter.post("/createUser",validate(createUserSchema),createUser)


export default userRouter;