import {prisma} from "../config/database.js"

export async function getAll(){
    try {
        const response = await prisma.user.findMany();
        return response;
    } catch (error) {
        
    }
}