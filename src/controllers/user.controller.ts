
import {getAllUsersService, getUserByIdService,createUserService} from "../services/users.service.js"
import { Request,Response } from "express"
import { sendSuccess } from "../utils/api-response.js";

export  async function getAllUsers(_req:Request,res:Response){
    const response = await getAllUsersService();
    sendSuccess(res,response);
}

export async function getUserById(req:Request,res:Response){
    const {id} = req.params;
    const response = await getUserByIdService(Number(id))
    sendSuccess(res,response)
}

export async function createUser(req:Request,res:Response) {
    try {
        const response = await createUserService(req.body);
        sendSuccess(res,response,201,"User created successfully")

    } catch (error:any) {
        console.log("Error in create user controller");
        res.status(500).json({success:false,message: error.message})
    }
}