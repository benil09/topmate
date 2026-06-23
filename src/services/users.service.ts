

import { createUserDto } from "../dtos/user.dto.js";
import {getAllUsers, getUserById,createUserRep, findByEmail} from "../repositories/user.repository.js"
import { conflict, notFound } from "../utils/api-error.js";


export async function getAllUsersService(){
    const resp= await getAllUsers();
    return resp;
}
export async function getUserByIdService(id:number){

    const resp= await getUserById(id);
    if(!resp){
        throw  notFound("User not found")
    }
    return resp;
}

export  const createUserService = async (data:createUserDto)=>{

    //check if the user already exists or not 
    const existingUser = await findByEmail(data.Email);
    if(existingUser){
        throw conflict("User already exist")
    }
    const response = await createUserRep(data);

    if(!response){
        throw new Error ("Unable to create user")
    }

    return response;
}


