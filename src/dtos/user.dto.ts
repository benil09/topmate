import {z } from 'zod'


export const createUserSchema = z.object({
    Email: z.email("invalid email address"),
    name:  z.string().min(1,"Name is required").max(100,'name should not exceed 100 char')
})


export type createUserDto = z.infer<typeof createUserSchema>