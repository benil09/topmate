import {getAllUsersService} from "../services/users.service.js"
import { Request,Response } from "express"

export  async function getAllUsers(_req:Request,res:Response){
    const response = await getAllUsersService();
    return res.json(response);
}