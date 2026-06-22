import {z } from 'zod'


export const createUserSchema = z.object({
    email:z.email("invalid email address"),
    name:z.string().max(100,'name must be less than 100 char').min(1,'name is required')
})


export type createUserDto = z.infer<typeof createUserSchema>