
import {prisma} from "../config/database.js"


export async function getAllUsersService(){
    const resp= await prisma.user.findMany()
    return resp;
}