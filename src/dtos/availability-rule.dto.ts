import {z} from 'zod'


const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const createAvailabilityRuleBaseSchema = z.object({
    weekday:z.number().int().min(0).max(6),
    startTime:z.string().regex(timeRegex,"invalid time format HH:MM"),
    endTime:z.string().regex(timeRegex,"invalid time format HH:MM"),
    isActive:z.boolean(),
    timezone:z.string().default("UTC"),
})
    

export const updateAvailabilityRuleBaseSchema = createAvailabilityRuleBaseSchema.partial();

export const createAvailabilityExceptionSchema = z.object({
    date:z.string().regex(dateRegex,"invalid date format YYYY-MM-DD"),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL", "ADD_AVAILABLE_WINDOW"]),
    startTime:z.string().regex(timeRegex,"invalid time format HH:MM").optional(),
    endTime:z.string().regex(timeRegex,"invalid time format HH:MM").optional(),
    timezone:z.string().default("UTC"),
    reason:z.string().max(500).optional()
})

export const updateExceptionSchema = createAvailabilityExceptionSchema.partial();

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleBaseSchema>;
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleBaseSchema>;
export type createAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>;
export type UpdateExceptionDto = z.infer<typeof updateExceptionSchema>;
