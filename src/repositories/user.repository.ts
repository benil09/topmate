import {prisma} from "../config/database.js"

export async function getAllUsers(){
    try {
        const response = await prisma.user.findMany();
        return response;
    } catch (error) {
        
    }
}
export async function getUserById(id:number){
    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        });
        return user;
    } catch (error) {
        
    }
}

// creating a user 
export const createUserRep = async (Email:string , name : string) =>{
    try {
        const user = await prisma.user.create({
            data : {
                Email,
                name
            }
        })
        return user;
    } catch (error) {
        console.log("Error in repo layer : " , error);
        throw error;
    }
}

export const updateUserRep = async (UserData:string, userId:number)=>{
    try {
        const updatedUser = await prisma.user.update({
            where:{id:userId},
            data:UserData
        })
        return updatedUser;
    } catch (error) {
        console.log("Error in repo layer" , error);
        throw error;
    }
}

export const deleteUserRep = async (userId:number)=>{
    try {
        const deletedUser = await prisma.user.delete({
            where:{id:userId}
        })
        return deletedUser
    } catch (error) {
        console.log("Error in delete user rep layer , " , error)
        throw error;
    }
}