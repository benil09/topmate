import { Request, Response } from "express";
import { sendSuccess } from "../utils/api-response.js";
import { badRequest } from "../utils/api-error.js";
import {
    getAvailabilityRulesByUserService,
    getActiveAvailabilityRulesByUserService,
    createAvailabilityRuleService,
    updateAvailabilityRuleService,
    deleteAvailabilityRuleService,
    getExceptionsByUserService,
    createExceptionService,
    updateExceptionService,
    deleteExceptionService,
    getExceptionsByUserInRangeService
} from "../services/availability.service.js";

// Get all availability rules for a user
export async function getAvailabilityRulesByUser(req: Request, res: Response) {
    const userId = Number(req.userId);
    const response = await getAvailabilityRulesByUserService(userId);
    sendSuccess(res, response);
}

// Get active availability rules for a user
export async function getActiveAvailabilityRulesByUser(req: Request, res: Response) {
    const userId = Number(req.userId);
    const response = await getActiveAvailabilityRulesByUserService(userId);
    sendSuccess(res, response);
}

// Create a new availability rule
export async function createAvailabilityRule(req: Request, res: Response) {
    const userId = req.userId as number;
    const response = await createAvailabilityRuleService(userId, req.body);
    sendSuccess(res, response, 201, "Availability rule created successfully");
}

// Update an availability rule
export async function updateAvailabilityRule(req: Request, res: Response) {
    const userId = req.userId as number;
    const id = Number(req.params.id);
    const response = await updateAvailabilityRuleService(id, userId, req.body);
    sendSuccess(res, response, 200, "Availability rule updated successfully");
}

// Delete an availability rule
export async function deleteAvailabilityRule(req: Request, res: Response) {
    const userId = req.userId as number;
    const id = Number(req.params.id);
    const response = await deleteAvailabilityRuleService(id, userId);
    sendSuccess(res, response, 200, "Availability rule deleted successfully");
}

// Get all exceptions for a user
export async function getExceptionsByUser(req: Request, res: Response) {
    const userId = Number(req.userId);
    const response = await getExceptionsByUserService(userId);
    sendSuccess(res, response);
}

// Create an exception
export async function createException(req: Request, res: Response) {
    const userId = req.userId as number;
    const response = await createExceptionService(userId, req.body);
    sendSuccess(res, response, 201, "Availability exception created successfully");
}

// Update an exception
export async function updateException(req: Request, res: Response) {
    const userId = req.userId as number;
    const id = Number(req.params.id);
    const response = await updateExceptionService(id, userId, req.body);
    sendSuccess(res, response, 200, "Availability exception updated successfully");
}

// Delete an exception
export async function deleteException(req: Request, res: Response) {
    const userId = req.userId as number;
    const id = Number(req.params.id);
    const response = await deleteExceptionService(id, userId);
    sendSuccess(res, response, 200, "Availability exception deleted successfully");
}

// Get exceptions within a date range
export async function getExceptionsByUserInRange(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        throw badRequest("startDate and endDate query parameters are required");
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw badRequest("Invalid date format. Use YYYY-MM-DD");
    }

    const response = await getExceptionsByUserInRangeService(userId, start, end);
    sendSuccess(res, response);
}
